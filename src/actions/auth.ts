"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { db } from "@/db";
import { users, type NewUser } from "@/db/schema";
import { eq } from "drizzle-orm";

export interface AuthFormData {
  email: string;
  password: string;
}

export interface UserMetadata {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber?: string;
  countryOfResidence: string;
}

/**
 * Authenticates a user by signing them in with their email and password.
 * If successful, the user is redirected to the home page.
 *
 * @param {AuthFormData} formData - Contains the user's email and password.
 * @returns {Object} - Returns an error object if authentication fails.
 */
export async function signIn(formData: AuthFormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

/**
 * Registers a new user by creating an account with their email and password.
 * If successful, a new user record is created in the database.
 *
 * @param {AuthFormData} formData - Contains the user's email and password.
 * @returns {Object} - Returns an error object if registration fails or success status.
 */
export async function signUp(formData: AuthFormData) {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.signUp({
    ...formData,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/onboarding`,
    },
  });

  if (error || !user) {
    return { error: error || new Error('Failed to create user') };
  }

  try {
    const newUser: NewUser = {
      id: user.id,
      email: user.email!,
      firstName: '',
      lastName: '',
      dateOfBirth: new Date().toISOString().split('T')[0],
      countryOfResidence: '',
    };
    
    await db.insert(users).values(newUser);
  } catch (dbError) {
    await supabase.auth.admin.deleteUser(user.id);
    return { error: new Error('Failed to create user record') };
  }

  return { success: true };
}

/**
 * Updates the metadata of the currently authenticated user.
 * If successful, the user's information is updated in both Supabase and the database.
 *
 * @param {UserMetadata} metadata - Contains the user's updated information.
 * @returns {Object} - Returns an error object if the update fails.
 */
export async function updateUserMetadata(metadata: UserMetadata) {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  
  if (userError || !user) {
    return { error: userError || new Error('User not found') };
  }

  const { error } = await supabase.auth.updateUser({
    data: metadata
  });

  if (error) {
    return { error };
  }

  try {
    await db.update(users)
      .set({
        firstName: metadata.firstName,
        middleName: metadata.middleName,
        lastName: metadata.lastName,
        dateOfBirth: metadata.dateOfBirth,
        phoneNumber: metadata.phoneNumber,
        countryOfResidence: metadata.countryOfResidence,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));
  } catch (dbError) {
    return { error: new Error('Failed to update user record') };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

/**
 * Signs out the currently authenticated user.
 * If successful, the user is redirected to the home page.
 *
 * @returns {Object} - Returns an error object if sign-out fails.
 */
export async function signOut() {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

/**
 * Initiates a password reset process by sending a reset email to the user.
 * If successful, the user receives an email with instructions to reset their password.
 *
 * @param {string} email - The email address of the user requesting a password reset.
 * @returns {Object} - Returns an error object if the request fails or success status.
 */
export async function forgotPassword(email: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) {
    return { error };
  }

  return { success: true };
}

/**
 * Resets the user's password to a new value.
 * If successful, the user is updated with the new password.
 *
 * @param {string} password - The new password for the user.
 * @returns {Object} - Returns an error object if the reset fails.
 */
export async function resetPassword(password: string) {
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

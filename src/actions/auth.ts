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

export async function signIn(formData: AuthFormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(formData);

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

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

export async function signOut() {
  const supabase = await createClient();
  
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { error };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

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

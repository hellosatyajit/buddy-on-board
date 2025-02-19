import { pgTable, text, timestamp, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  
  firstName: text("first_name").notNull(),
  middleName: text("middle_name"),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  dateOfBirth: date("date_of_birth").notNull(),
  phoneNumber: text("phone_number"),
  countryOfResidence: text("country_of_residence").notNull(),
  
  isVerified: text("is_verified").default("pending").notNull(),
  verifiedAt: timestamp("verified_at"),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
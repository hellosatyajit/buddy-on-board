CREATE TYPE "public"."file_type" AS ENUM('image/png', 'image/jpeg', 'application/pdf');--> statement-breakpoint
CREATE TYPE "public"."message_delivery_status" AS ENUM('sent', 'delivered', 'read');--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"middle_name" text,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"date_of_birth" date NOT NULL,
	"phone_number" text,
	"country_of_residence" text NOT NULL,
	"is_verified" text DEFAULT 'pending' NOT NULL,
	"verified_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
CREATE TABLE IF NOT EXISTS "users" (
  "id" text PRIMARY KEY,
  "first_name" text NOT NULL,
  "middle_name" text,
  "last_name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "date_of_birth" date NOT NULL,
  "phone_number" text,
  "country_of_residence" text NOT NULL,
  "is_verified" text NOT NULL DEFAULT 'pending',
  "verified_at" timestamp,
  "created_at" timestamp NOT NULL DEFAULT now(),
  "updated_at" timestamp NOT NULL DEFAULT now()
); 
CREATE TYPE "public"."package_status" AS ENUM('pending', 'picked_up', 'in_transit', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."service_status" AS ENUM('active', 'completed', 'cancelled', 'pending');--> statement-breakpoint
CREATE TYPE "public"."service_type" AS ENUM('travel_buddy', 'courier_buddy');--> statement-breakpoint
CREATE TABLE "airports" (
	"id" integer PRIMARY KEY NOT NULL,
	"ident" text NOT NULL,
	"type" text NOT NULL,
	"name" text NOT NULL,
	"elevation_ft" integer,
	"continent" text,
	"iso_country" text,
	"iso_region" text,
	"municipality" text,
	"gps_code" text,
	"iata_code" text,
	"local_code" text,
	"latitude" real,
	"longitude" real,
	"is_armforced" boolean DEFAULT false,
	CONSTRAINT "airports_ident_unique" UNIQUE("ident"),
	CONSTRAINT "airports_iata_code_unique" UNIQUE("iata_code")
);
--> statement-breakpoint
CREATE TABLE "courier_buddy_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"max_weight" integer NOT NULL,
	"max_length" integer,
	"max_width" integer,
	"max_height" integer,
	"accepted_item_categories" uuid[],
	"additional_details" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "item_categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"category_id" uuid NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "package_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"item_category_id" uuid NOT NULL,
	"weight" integer NOT NULL,
	"length" integer,
	"width" integer,
	"height" integer,
	"description" text NOT NULL,
	"has_documents" boolean DEFAULT false NOT NULL,
	"status" "package_status" DEFAULT 'pending' NOT NULL,
	"tracking_details" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"reviewer_id" text NOT NULL,
	"punctuality_and_reliability" integer,
	"friendliness_and_behavior" integer,
	"communication_skills" integer,
	"overall_journey_experience" integer,
	"timeliness_of_delivery" integer,
	"communication_throughout_delivery" integer,
	"package_handling" integer,
	"overall_delivery_experience" integer,
	"comment" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_id" text NOT NULL,
	"service_type" "service_type" NOT NULL,
	"service_status" "service_status" DEFAULT 'active' NOT NULL,
	"origin_airport_id" integer NOT NULL,
	"destination_airport_id" integer NOT NULL,
	"departure_date" date NOT NULL,
	"departure_time" time NOT NULL,
	"arrival_date" date NOT NULL,
	"arrival_time" time NOT NULL,
	"price" integer NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seeker_id" text NOT NULL,
	"listing_id" uuid NOT NULL,
	"status" "service_status" DEFAULT 'pending' NOT NULL,
	"additional_details" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "travel_buddy_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"languages_spoken" text[] NOT NULL,
	"assistance_capabilities" text,
	"dietary_preferences" text,
	"additional_details" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "travelers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"request_id" uuid NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"date_of_birth" date NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "courier_buddy_details" ADD CONSTRAINT "courier_buddy_details_listing_id_service_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."service_listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "items" ADD CONSTRAINT "items_category_id_item_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."item_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "package_details" ADD CONSTRAINT "package_details_request_id_service_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."service_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "package_details" ADD CONSTRAINT "package_details_item_category_id_item_categories_id_fk" FOREIGN KEY ("item_category_id") REFERENCES "public"."item_categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_request_id_service_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."service_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_reviewer_id_users_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listings" ADD CONSTRAINT "service_listings_provider_id_users_id_fk" FOREIGN KEY ("provider_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listings" ADD CONSTRAINT "service_listings_origin_airport_id_airports_id_fk" FOREIGN KEY ("origin_airport_id") REFERENCES "public"."airports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_listings" ADD CONSTRAINT "service_listings_destination_airport_id_airports_id_fk" FOREIGN KEY ("destination_airport_id") REFERENCES "public"."airports"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_seeker_id_users_id_fk" FOREIGN KEY ("seeker_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_listing_id_service_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."service_listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "travel_buddy_details" ADD CONSTRAINT "travel_buddy_details_listing_id_service_listings_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."service_listings"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "travelers" ADD CONSTRAINT "travelers_request_id_service_requests_id_fk" FOREIGN KEY ("request_id") REFERENCES "public"."service_requests"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "idx_airport_ident" ON "airports" USING btree ("ident");--> statement-breakpoint
CREATE UNIQUE INDEX "idx_airport_iata" ON "airports" USING btree ("iata_code");--> statement-breakpoint
CREATE INDEX "idx_airport_name" ON "airports" USING btree ("name");--> statement-breakpoint
CREATE INDEX "idx_airport_municipality" ON "airports" USING btree ("municipality");--> statement-breakpoint
CREATE INDEX "idx_airport_type" ON "airports" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_airport_country" ON "airports" USING btree ("iso_country");
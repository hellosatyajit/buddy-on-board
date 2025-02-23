import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  date,
  time,
  integer,
  pgEnum,
  jsonb,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { users } from "./users";
import { airports } from "./airport";

export enum ServiceTypeEnum {
  TRAVEL_BUDDY = "travel_buddy",
  COURIER_BUDDY = "courier_buddy",
}

export enum ServiceStatusEnum {
  ACTIVE = "active",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  PENDING = "pending",
}

export enum PackageStatusEnum {
  PENDING = "pending",
  PICKED_UP = "picked_up",
  IN_TRANSIT = "in_transit",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export const serviceTypeEnum = pgEnum(
  "service_type",
  Object.values(ServiceTypeEnum) as [string, ...string[]]
);
export const serviceStatusEnum = pgEnum(
  "service_status",
  Object.values(ServiceStatusEnum) as [string, ...string[]]
);
export const packageStatusEnum = pgEnum(
  "package_status",
  Object.values(PackageStatusEnum) as [string, ...string[]]
);

// Item Categories Table
export const itemCategories = pgTable("item_categories", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Items within Categories
export const items = pgTable("items", {
  id: uuid("id").defaultRandom().primaryKey(),
  categoryId: uuid("category_id")
    .references(() => itemCategories.id)
    .notNull(),
  name: text("name").notNull(),
  description: text("description"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Service Listings (base table for both Travel and Courier)
export const serviceListings = pgTable("service_listings", {
  id: uuid("id").defaultRandom().primaryKey(),
  providerId: text("provider_id")
    .references(() => users.id)
    .notNull(),
  serviceType: serviceTypeEnum("service_type").notNull(),
  status: serviceStatusEnum("service_status").default("active").notNull(),
  originAirportId: integer("origin_airport_id")
    .references(() => airports.id)
    .notNull(),
  destinationAirportId: integer("destination_airport_id")
    .references(() => airports.id)
    .notNull(),
  departureDate: date("departure_date").notNull(),
  departureTime: time("departure_time").notNull(),
  arrivalDate: date("arrival_date").notNull(),
  arrivalTime: time("arrival_time").notNull(),
  price: integer("price").notNull(), // in cents
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Travel Buddy Specific Details
export const travelBuddyDetails = pgTable("travel_buddy_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id")
    .references(() => serviceListings.id)
    .notNull(),
  languagesSpoken: text("languages_spoken").array().notNull(),
  assistanceCapabilities: text("assistance_capabilities"),
  dietaryPreferences: text("dietary_preferences"),
  additionalDetails: jsonb("additional_details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Travelers for Service Requests
export const travelers = pgTable("travelers", {
  id: uuid("id").defaultRandom().primaryKey(),
  requestId: uuid("request_id")
    .references(() => serviceRequests.id)
    .notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Courier Buddy Specific Details
export const courierBuddyDetails = pgTable("courier_buddy_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  listingId: uuid("listing_id")
    .references(() => serviceListings.id)
    .notNull(),
  maxWeight: integer("max_weight").notNull(), // in grams
  maxLength: integer("max_length"), // in cm
  maxWidth: integer("max_width"), // in cm
  maxHeight: integer("max_height"), // in cm
  acceptedItemCategories: uuid("accepted_item_categories").array(),
  additionalDetails: jsonb("additional_details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Service Requests
export const serviceRequests = pgTable("service_requests", {
  id: uuid("id").defaultRandom().primaryKey(),
  seekerId: text("seeker_id")
    .references(() => users.id)
    .notNull(),
  listingId: uuid("listing_id")
    .references(() => serviceListings.id)
    .notNull(),
  status: serviceStatusEnum("status").default("pending").notNull(),
  additionalDetails: jsonb("additional_details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Courier Package Details
export const packageDetails = pgTable("package_details", {
  id: uuid("id").defaultRandom().primaryKey(),
  requestId: uuid("request_id")
    .references(() => serviceRequests.id)
    .notNull(),
  itemCategoryId: uuid("item_category_id")
    .references(() => itemCategories.id)
    .notNull(),
  weight: integer("weight").notNull(), // in grams
  length: integer("length"), // in cm
  width: integer("width"), // in cm
  height: integer("height"), // in cm
  description: text("description").notNull(),
  hasDocuments: boolean("has_documents").default(false).notNull(),
  status: packageStatusEnum("status").default("pending").notNull(),
  trackingDetails: jsonb("tracking_details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Reviews
export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  requestId: uuid("request_id")
    .references(() => serviceRequests.id)
    .notNull(),
  reviewerId: text("reviewer_id")
    .references(() => users.id)
    .notNull(),
  // Travel Buddy Ratings
  punctualityAndReliability: integer("punctuality_and_reliability"),
  friendlinessAndBehavior: integer("friendliness_and_behavior"),
  communicationSkills: integer("communication_skills"),
  overallJourneyExperience: integer("overall_journey_experience"),
  // Courier Buddy Ratings
  timelinessOfDelivery: integer("timeliness_of_delivery"),
  communicationThroughoutDelivery: integer("communication_throughout_delivery"),
  packageHandling: integer("package_handling"),
  overallDeliveryExperience: integer("overall_delivery_experience"),
  // Common fields
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const serviceListingsRelations = relations(
  serviceListings,
  ({ one, many }) => ({
    provider: one(users, {
      fields: [serviceListings.providerId],
      references: [users.id],
    }),
    originAirport: one(airports, {
      fields: [serviceListings.originAirportId],
      references: [airports.id],
    }),
    destinationAirport: one(airports, {
      fields: [serviceListings.destinationAirportId],
      references: [airports.id],
    }),
    travelBuddyDetails: one(travelBuddyDetails, {
      fields: [serviceListings.id],
      references: [travelBuddyDetails.listingId],
    }),
    courierBuddyDetails: one(courierBuddyDetails, {
      fields: [serviceListings.id],
      references: [courierBuddyDetails.listingId],
    }),
    requests: many(serviceRequests),
  })
);

export const serviceRequestsRelations = relations(
  serviceRequests,
  ({ one, many }) => ({
    seeker: one(users, {
      fields: [serviceRequests.seekerId],
      references: [users.id],
    }),
    listing: one(serviceListings, {
      fields: [serviceRequests.listingId],
      references: [serviceListings.id],
    }),
    travelers: many(travelers),
    packageDetails: one(packageDetails, {
      fields: [serviceRequests.id],
      references: [packageDetails.requestId],
    }),
    reviews: many(reviews),
  })
);

// Types
export type ServiceListing = typeof serviceListings.$inferSelect;
export type NewServiceListing = typeof serviceListings.$inferInsert;

export type TravelBuddyDetail = typeof travelBuddyDetails.$inferSelect;
export type NewTravelBuddyDetail = typeof travelBuddyDetails.$inferInsert;

export type CourierBuddyDetail = typeof courierBuddyDetails.$inferSelect;
export type NewCourierBuddyDetail = typeof courierBuddyDetails.$inferInsert;

export type ServiceRequest = typeof serviceRequests.$inferSelect;
export type NewServiceRequest = typeof serviceRequests.$inferInsert;

export type PackageDetail = typeof packageDetails.$inferSelect;
export type NewPackageDetail = typeof packageDetails.$inferInsert;

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;

export type Traveler = typeof travelers.$inferSelect;
export type NewTraveler = typeof travelers.$inferInsert;

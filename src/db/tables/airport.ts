import {
  pgTable,
  text,
  integer,
  real,
  boolean,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const airports = pgTable(
  "airports",
  {
    id: integer("id").primaryKey(),
    ident: text("ident").notNull().unique(),
    type: text("type").notNull(),
    name: text("name").notNull(),
    elevationFt: integer("elevation_ft"),
    continent: text("continent"),
    isoCountry: text("iso_country"),
    isoRegion: text("iso_region"),
    municipality: text("municipality"),
    gpsCode: text("gps_code"),
    iataCode: text("iata_code").unique(),
    localCode: text("local_code"),
    latitude: real("latitude"),
    longitude: real("longitude"),
    isArmforced: boolean("is_armforced").default(false),
  },
  (table) => [
    uniqueIndex("idx_airport_ident").on(table.ident),
    uniqueIndex("idx_airport_iata").on(table.iataCode),
    index("idx_airport_name").on(table.name),
    index("idx_airport_municipality").on(table.municipality),
    index("idx_airport_type").on(table.type),
    index("idx_airport_country").on(table.isoCountry),
  ]
);

export type Airport = typeof airports.$inferSelect;
export type NewAirport = typeof airports.$inferInsert;
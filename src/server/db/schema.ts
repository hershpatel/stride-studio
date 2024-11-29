import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `stride-studio_${name}`);

export const athletes = createTable(
  "athlete",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    stravaAthleteId: varchar("strava_athlete_id", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .$onUpdate(() => new Date())
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (athlete) => ({
    stravaAthleteIdIdx: index("athlete_strava_athlete_id_idx").on(athlete.stravaAthleteId),
  })
);

export const activities = createTable(
  "activity",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    athleteId: integer("athlete_id")
      .notNull()
      .references(() => athletes.id),
    stravaActivityId: varchar("strava_activity_id", { length: 255 }).notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .$onUpdate(() => new Date())
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (activity) => ({
    athleteIdIdx: index("activity_athlete_id_idx").on(activity.athleteId),
    stravaActivityIdIdx: index("activity_strava_activity_id_idx").on(activity.stravaActivityId),
  })
);

// Define the relationships
export const athletesRelations = relations(athletes, ({ many }) => ({
  activities: many(activities),
}));

export const activitiesRelations = relations(activities, ({ one }) => ({
  athlete: one(athletes, { fields: [activities.athleteId], references: [athletes.id] }),
}));

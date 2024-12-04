import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getAccountByUserId } from "~/server/db/query";
import { StravaClient } from "../strava/client";
import { StravaActivity } from "../strava/model";

export const activitiesRouter = createTRPCRouter({
  getRecentActivities: protectedProcedure
    .input(z.object({ 
      userId: z.string(),
      per_page: z.number().default(10)
    }))
    .output(z.array(z.string()))
    .query(async ({ input }) => {
      const account = await getAccountByUserId(input.userId);

      if (!account?.access_token) {
        throw new Error("User is not connected to Strava");
      }

      const activities = await StravaClient.listAthleteActivities(account.access_token, {
        per_page: input.per_page,
      });

      return activities.map((activity: StravaActivity) => activity.name);
    }),
});

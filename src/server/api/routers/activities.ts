import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getAccountByUserId } from "~/server/db/query";
import { StravaClient } from "../strava/client";
import { stravaActivitySchema } from "../strava/model";

export const activitiesRouter = createTRPCRouter({
  getRecentActivities: protectedProcedure
    .input(z.object({ 
      per_page: z.number().default(10)
    }))
    .output(z.array(stravaActivitySchema))
    .query(async ({ ctx, input }) => {
      const account = await getAccountByUserId(ctx.session.user.id);

      if (!account?.access_token) {
        throw new Error("User is not connected to Strava");
      }

      const activities = await StravaClient.listAthleteActivities(account.access_token, {
        per_page: input.per_page,
      });

      return activities;
    })
});

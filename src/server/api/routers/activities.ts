import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const activitiesRouter = createTRPCRouter({
  getByAthleteId: protectedProcedure
    .input(z.object({ athleteId: z.string() }))
    .output(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      return ["activity1", "activity2"];
    }),
});

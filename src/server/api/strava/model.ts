import { z } from "zod";

export const stravaActivitySchema = z.object({
  id: z.number(),
  name: z.string(),
  distance: z.number(),
  moving_time: z.number(),
  elapsed_time: z.number(),
  type: z.string(),
  start_date: z.string(),
  start_date_local: z.string(),
});

export type StravaActivity = z.infer<typeof stravaActivitySchema>;

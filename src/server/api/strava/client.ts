const STRAVA_API_BASE = "https://www.strava.com/api/v3";

export class StravaClient {
  private static async fetch(endpoint: string, accessToken: string, params?: Record<string, string>) {
    const url = new URL(`${STRAVA_API_BASE}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Strava API error: ${response.statusText}`);
    }

    return response.json();
  }

  static async listAthleteActivities(
    accessToken: string,
    params?: {
      before?: number;
      after?: number;
      page?: number;
      per_page?: number;
    }
  ) {
    return this.fetch("/athlete/activities", accessToken, params as Record<string, string>);
  }
}

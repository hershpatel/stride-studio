import Link from "next/link";

import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  const activities = session?.user
    ? await api.activities.getByAthleteId({
        athleteId: session.user.id,
      })
    : null;

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fc4c02] to-[#000000] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-4xl font-bold">
              Welcome to Stride Studio{session?.user ? `, ${session.user.name}` : ''}
            </h2>
            {session?.user && (
              <>
                <div>
                  {session.user.image && (
                    <img
                      src={session.user.image}
                      alt="User Avatar"
                      className="w-16 h-16 rounded-full"
                    />
                  )}
                </div>
                <div className="flex flex-col items-center gap-4">
                  <h3 className="text-xl font-semibold">Your Activities</h3>
                  {activities && activities.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl justify-items-center">
                      {activities.map((activity, index) => (
                        <div 
                          key={index}
                          className="bg-white/10 p-4 rounded-lg shadow-lg hover:bg-white/20 transition-all w-full max-w-md"
                        >
                          <div className="text-center">
                            {activity}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No activities found</p>
                  )}
                </div>
              </>
            )}
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}

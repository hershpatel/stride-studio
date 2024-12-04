import Link from "next/link";
import { ConnectWithStravaButton } from "./strava_signin_button";

export function AuthButton({ session }: { session: any }) {
  return (
    <>
      {!session ? (
        <ConnectWithStravaButton />
      ) : (
        <Link
          href="/api/auth/signout"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
        >
          Sign out
        </Link>
      )}
    </>
  );
}

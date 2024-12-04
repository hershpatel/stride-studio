import Link from "next/link";
import type { Session } from "next-auth";
import { ConnectWithStravaButton } from "./strava_signin_button";

interface AuthButtonProps {
  session: Session | null;
}

export function AuthButton({ session }: AuthButtonProps) {
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

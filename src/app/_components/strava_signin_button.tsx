import Link from "next/link";

export function ConnectWithStravaButton() {
  return (
    <Link
      href="/api/auth/signin"
      className="hover:opacity-80 transition-opacity drop-shadow-lg"
    >
      <img
        src="/connect_with_strava_white.svg"
        alt="Connect with Strava"
        height={48}
        width={193}
      />
    </Link>
  );
}

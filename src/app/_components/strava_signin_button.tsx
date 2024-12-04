import Link from "next/link";
import Image from "next/image";

export function ConnectWithStravaButton() {
  return (
    <Link
      href="/api/auth/signin"
      className="hover:opacity-80 transition-opacity drop-shadow-lg"
    >
      <Image
        src="/connect_with_strava_white.svg"
        alt="Connect with Strava"
        height={48}
        width={193}
        priority
      />
    </Link>
  );
}

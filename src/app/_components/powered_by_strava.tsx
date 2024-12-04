import Image from "next/image";

export function PoweredByStrava() {
  return (
    <div>
      <Image
        src="/powered_by_strava_gray.svg"
        alt="Powered by Strava"
        height={25}
        width={139}
        priority
      />
    </div>
  );
}

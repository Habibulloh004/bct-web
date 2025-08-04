"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Marquee } from "../magicui/marquee";
import { cn } from "@/lib/utils";

export default function InfinityCardImage({
  data = [],
  reverse = false,
  className = "",
  classNameImage = "",
}) {
  const router = useRouter();

  return (
    <div className="relative w-full flex flex-col items-center justify-center overflow-hidden">
      <Marquee
        reverse={reverse}
        pauseOnHover
        className={cn("[--duration:40s] flex gap-4", className)}
      >
        {data.map((card, index) => (
          <div
            key={index}
            onClick={() => router.push(`/brand/${card?.id ?? ""}`)}
            className={cn("relative h-48 min-w-[500px] flex-shrink-0 cursor-pointer")}
          >
            <Image
              src={card?.image}
              alt="project"
              loading="eager"
              fill
              className={cn("object-cover", classNameImage)}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

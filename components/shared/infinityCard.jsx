"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Marquee } from "../magicui/marquee";
import { cn } from "@/lib/utils";

export default function InfinityCard({ data, reverse = false, className, classNameImage, classNameImageContainer }) {
  const router = useRouter();
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee reverse={reverse} pauseOnHover className={cn("[--duration:40s] gap-3", className)}>
        {data?.map((card, index) => (
          <div
            onClick={() => router.push(`/brand/${card?.id}`)}
            key={index}
            className={cn("relative w-full h-full", classNameImageContainer)}
          >
            <Image
              src={card?.image}
              alt="image"
              loading="eager"
              width={100}
              height={100}
              className={cn("cursor-pointer w-full h-32 mr-4 object-contain", classNameImage)}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

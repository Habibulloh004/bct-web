"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Marquee } from "../magicui/marquee";
import { cn } from "@/lib/utils";

export default function InfinityCard({
  data,
  reverse = false,
  className,
  classNameImage,
  classNameImageContainer,
  colorOnHover = false,
}) {
  const router = useRouter();

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      {/* Chapdagi gradient shadow */}
      {/* <div className="max-md:hidden pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10" /> */}
      
      {/* O‘ngdagi gradient shadow */}
      {/* <div className="max-md:hidden pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10" /> */}

      <Marquee reverse={reverse} pauseOnHover className={cn("[--duration:40s] gap-3", className)}>
        {data?.map((card, index) => (
          <div
            key={index}
            className={cn("relative h-full", classNameImageContainer)}
          >
            <Image
              src={card?.image}
              alt="image"
              loading="eager"
              width={100}
              height={100}
              draggable={false}
              className={cn(
                "cursor-pointer w-auto max-w-32 h-14 mr-4 object-contain",
                colorOnHover
                  ? "grayscale hover:grayscale-0 transition-[filter] duration-300 hover:scale-[1.1]"
                  : "",
                classNameImage
              )}
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

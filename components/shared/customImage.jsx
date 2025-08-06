"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CustomImage = ({
  src,
  alt,
  className,
  loading: loadingImg,
  property,
  fill = true,
  ...props
}) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {loading && <Skeleton className="absolute inset-0 h-full w-full" />}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        loading={loadingImg ? loadingImg : "lazy"}
        quality={100}
        className={cn(
          className,
          "duration-700 ease-in-out group-hover:opacity-75",
          loading
            ? "scale-110 blur-2xl grayscale"
            : "scale-100 blur-0 grayscale-0"
        )}
        onLoad={() => setLoading(false)}
        priority={property === "true"}
        {...props}
      />
    </div>
  );
};

export default CustomImage;
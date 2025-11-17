"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const isRichText = (value) => {
  if (!value) return false;
  return /<\/?[a-z][\s\S]*>/i.test(value);
};

export default function ProductRichText({
  value,
  collapsedHeight = 140,
  minLengthForToggle = 120,
  className,
  richTextClassName = "prose prose-sm max-w-none text-gray-800",
  plainTextClassName = "text-base leading-relaxed text-gray-800 whitespace-pre-line",
  toggleClassName = "mt-2 text-blue-600 font-medium hover:underline",
  moreLabel = "Show More",
  lessLabel = "Show Less",
  renderToggle,
}) {
  const [expanded, setExpanded] = useState(false);
  const rich = isRichText(value);
  if (!value) return null;

  const shouldShowToggle = value?.length > minLengthForToggle;
  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <div className={cn("mt-4", className)}>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: expanded ? "none" : `${collapsedHeight}px` }}
      >
        {rich ? (
          <div
            className={richTextClassName}
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <p className={plainTextClassName}>{value}</p>
        )}
      </div>

      {shouldShowToggle &&
        (renderToggle ? (
          renderToggle({
            expanded,
            toggle: handleToggle,
            moreLabel,
            lessLabel,
          })
        ) : (
          <button className={toggleClassName} onClick={handleToggle}>
            {expanded ? lessLabel : moreLabel}
          </button>
        ))}
    </div>
  );
}

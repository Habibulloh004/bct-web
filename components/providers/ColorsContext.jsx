// components/providers/ColorsContext.jsx
"use client";
import { getData } from "@/actions/get";
import React, { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext({ colors: [] });

export function ColorsProvider({ children }) {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const colors = await getData({
          endpoint: `/api/select-reviews?page=1&limit=40`,
          tag: ["select-reviews"],
          revalidate: 3600
        })
        const colorData = colors?.data?.map((cl) => ({
          color: cl?.message,
          key: cl?.email
        }))
        setColors(colorData);
        console.log({colorData})
        colorData?.forEach(({ key, color }) => {
          const cssVarName = `--${String(key).replace(/_/g, "-")}`;
          document.documentElement.style.setProperty(cssVarName, String(color));
        });
      } catch (e) {
        console.error("ColorsProvider error:", e);
      }
    })();
  }, []);

  return <Ctx.Provider value={{ colors }}>{children}</Ctx.Provider>;
}

export const useColors = () => useContext(Ctx);



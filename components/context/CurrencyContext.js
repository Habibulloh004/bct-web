"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch("/api/currency"); // caching backendda
        const data = await res.json();
        setRate(data.conversion_rates.UZS);
      } catch (err) {
        console.error("Currency fetch error:", err);
        setRate(13000); // fallback kurs
      }
    }
    fetchRate();
  }, []);

  function convert(priceUsd) {
    if (!rate) return null;
    let total = priceUsd * rate;
    total = total * 1.01;
    total = Math.round(total / 1000) * 1000;
    return total;
  }

  return (
    <CurrencyContext.Provider value={{ rate, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

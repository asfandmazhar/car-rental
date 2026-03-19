"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext<any>(null);

export const CurrencyProvider = ({ children }: any) => {
  const [currency, setCurrency] = useState("USD");
  const [rates, setRates] = useState<any>({});

  // Load saved currency
  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved) setCurrency(saved);
  }, []);

  // Save currency
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  // Fetch exchange rates
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => setRates(data.rates));
  }, []);

  const convertPrice = (price: number) => {
    if (!rates[currency]) return price;
    return (price * rates[currency]).toFixed(2);
  };

  const symbols: any = {
    USD: "$",
    PKR: "₨",
    EUR: "€",
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, setCurrency, convertPrice, symbol: symbols[currency] }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);

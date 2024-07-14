import React, { createContext, ReactNode, useContext, useState } from "react";

export interface LabelCode {
  code: string;
  label: string;
}

export const languages: LabelCode[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "ko", label: "Korean" },
  { code: "vn", label: "Vietnamese" },
];

export const currencies: LabelCode[] = [
  { code: "usd", label: "USD" },
  { code: "eur", label: "EUR" },
  { code: "won", label: "WON" },
  { code: "dng", label: "DNG" },
];

interface CurrencyContextProps {
  currency: LabelCode;
  setCurrency: (currency: LabelCode) => void;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined,
);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState(currencies[0]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

interface LanguageContextProps {
  language: LabelCode;
  setLanguage: (language: LabelCode) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState(languages[0]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

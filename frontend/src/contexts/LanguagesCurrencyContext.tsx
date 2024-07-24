import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface LabelCode {
  code: string;
  label: string;
}

export interface Currency extends LabelCode {
  exchangeRate: number;
  symbol: string;
  symbolAfter: boolean;
  numberFormat: Intl.NumberFormat;
}

export const languages: LabelCode[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "ko", label: "Korean" },
  { code: "vn", label: "Vietnamese" },
];

export const currencies: Currency[] = [
  {
    code: "usd",
    label: "USD",
    exchangeRate: 1,
    symbol: "$",
    symbolAfter: false,
    numberFormat: new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  },
  {
    code: "eur",
    label: "EUR",
    exchangeRate: 0.92,
    symbol: "€",
    symbolAfter: true,
    numberFormat: new Intl.NumberFormat("fr-FR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  },
  {
    code: "won",
    label: "WON",
    exchangeRate: 1384,
    symbol: "₩",
    symbolAfter: false,
    numberFormat: new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 }),
  },
  {
    code: "dng",
    label: "DNG",
    exchangeRate: 25365,
    symbol: "₫",
    symbolAfter: false,
    numberFormat: new Intl.NumberFormat("vn-VN", { maximumFractionDigits: 0 }),
  },
];

interface CurrencyContextProps {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(
  undefined,
);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState(() => {
    console.log("Local storage currency: ", localStorage.getItem("currency"));
    const savedCurrencyCode = localStorage.getItem("currency");
    return savedCurrencyCode
      ? currencies.find((c) => c.code === savedCurrencyCode) || currencies[0]
      : currencies[0];
  });

  useEffect(() => {
    localStorage.setItem("currency", currency.code);
  }, [currency]);

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
  const [language, setLanguage] = useState(() => {
    const savedLanguageCode = localStorage.getItem("language");
    return savedLanguageCode
      ? languages.find((l) => l.code === savedLanguageCode) || languages[0]
      : languages[0];
  });

  useEffect(() => {
    localStorage.setItem("language", language.code);
  }, [language]);

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

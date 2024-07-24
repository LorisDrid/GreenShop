import { useCurrency } from "../contexts/LanguagesCurrencyContext";

export const ConvertPrice = (price: number): string => {
  const { currency } = useCurrency();
  const priceConverted = price * (currency.exchangeRate || 1);
  const priceFormated = currency.numberFormat?.format(priceConverted);
  if (currency.symbolAfter) {
    return `${priceFormated}${currency.symbol}`;
  } else {
    return `${currency.symbol}${priceFormated}`;
  }
};

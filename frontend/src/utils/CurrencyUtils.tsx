const exchangeRates: { [key: string]: number } = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
};

export const convertPrice = (price: number, currency: string): string => {
  return formatPrice(price * (exchangeRates[currency] || 1), currency);
};

const formatPrice = (price: number, currency: string): string => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    price,
  );
};

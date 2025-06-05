const DEFAULT_CURRENCY = "ILS";
const DEFAULT_LOCALE = "he-IL";

function useCurrency(amount: number) {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency: DEFAULT_CURRENCY,
  }).format(amount);
}

export default useCurrency;
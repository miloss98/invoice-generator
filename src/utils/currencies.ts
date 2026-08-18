export const currencies = [
  { code: "USD", symbol: "$", label: "USD ($)" },
  { code: "EUR", symbol: "€", label: "EUR (€)" },
  { code: "GBP", symbol: "£", label: "GBP (£)" },
  { code: "BAM", symbol: "KM", label: "BAM (KM)" },
  { code: "CHF", symbol: "CHF", label: "CHF" },
  { code: "CAD", symbol: "CA$", label: "CAD (CA$)" },
  { code: "AUD", symbol: "A$", label: "AUD (A$)" },
];

export const getCurrencySymbol = (code: string): string => {
  return currencies.find((c) => c.code === code)?.symbol ?? code;
};

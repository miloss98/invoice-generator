import type { LineItem } from "../types/invoice";

export const calculateTotal = (items: LineItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
};

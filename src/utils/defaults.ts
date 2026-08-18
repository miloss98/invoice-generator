import type {
  CompanyInfo,
  Client,
  InvoiceData,
  LineItem,
} from "../types/invoice";

export const emptyClient = (): Client => ({
  id: crypto.randomUUID(),
  name: "",
  email: "",
  phone: "",
  address: "",
});

export const emptyLineItem = (): LineItem => ({
  id: crypto.randomUUID(),
  description: "",
  quantity: 1,
  rate: 0,
});

export const defaultCompanyInfo: CompanyInfo = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  taxId: "",
  logo: null,
};

export const nextInvoiceNumber = (current: string): string => {
  const match = current.match(/(\d+)$/);
  if (!match) return "INV-001";
  const next = (parseInt(match[1], 10) + 1)
    .toString()
    .padStart(match[1].length, "0");
  return current.slice(0, match.index) + next;
};

export const defaultInvoiceData = (): InvoiceData => ({
  invoiceNumber: "INV-001",
  date: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  currency: "USD",
  paymentTerms: "Net 30",
  client: emptyClient(),
  items: [emptyLineItem()],
  paymentDetails: "",
  notes: "",
  signature: "",
  status: "unpaid",
});

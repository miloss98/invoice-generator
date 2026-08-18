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
  postalCode: "",
  country: "",
  taxId: "",
  logo: null,
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
  signature: "",
});

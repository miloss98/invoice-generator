export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface CompanyInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  taxId: string;
  logo: string | null;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export type InvoiceStatus = "unpaid" | "paid";

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  currency: string;
  paymentTerms: string;
  client: Client;
  items: LineItem[];
  paymentDetails: string;
  notes: string;
  signature: string;
  status: InvoiceStatus;
}

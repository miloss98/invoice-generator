import { Layout } from "./components/Layout";
import { CompanyInfoForm } from "./components/CompanyInfoForm";
import { ClientForm } from "./components/ClientForm";
import { InvoiceMetaForm } from "./components/InvoiceMetaForm";
import { LineItemsForm } from "./components/LineItemsForm";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { defaultCompanyInfo, defaultInvoiceData } from "./utils/defaults";
import { calculateTotal } from "./utils/calculations";
import { getCurrencySymbol } from "./utils/currencies";
import type {
  CompanyInfo,
  InvoiceData,
  Client,
  LineItem,
} from "./types/invoice";

export const App = () => {
  const [companyInfo, setCompanyInfo] = useLocalStorage<CompanyInfo>(
    "companyInfo",
    defaultCompanyInfo,
  );
  const [invoiceData, setInvoiceData] = useLocalStorage<InvoiceData>(
    "currentInvoice",
    defaultInvoiceData(),
  );

  const updateClient = (client: Client) => {
    setInvoiceData({ ...invoiceData, client });
  };

  const updateItems = (items: LineItem[]) => {
    setInvoiceData({ ...invoiceData, items });
  };

  const total = calculateTotal(invoiceData.items);
  const symbol = getCurrencySymbol(invoiceData.currency);

  return (
    <Layout
      form={
        <>
          <CompanyInfoForm
            companyInfo={companyInfo}
            onChange={setCompanyInfo}
          />
          <ClientForm client={invoiceData.client} onChange={updateClient} />
          <InvoiceMetaForm
            invoiceData={invoiceData}
            onChange={setInvoiceData}
          />
          <LineItemsForm
            items={invoiceData.items}
            currency={invoiceData.currency}
            onChange={updateItems}
          />
        </>
      }
      preview={
        <div className="rounded-card bg-white border border-ink-100 shadow-card p-4">
          <p className="text-sm text-ink-500">Live preview coming next</p>
          <p className="text-lg font-mono font-medium text-primary-600 mt-2">
            {symbol}
            {total.toFixed(2)}
          </p>
        </div>
      }
    />
  );
};

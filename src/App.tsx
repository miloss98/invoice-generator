import { Layout } from "./components/Layout";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { defaultCompanyInfo, defaultInvoiceData } from "./utils/defaults";
import type { CompanyInfo, InvoiceData } from "./types/invoice";

export const App = () => {
  const [companyInfo, setCompanyInfo] = useLocalStorage<CompanyInfo>(
    "companyInfo",
    defaultCompanyInfo,
  );
  const [invoiceData, setInvoiceData] = useLocalStorage<InvoiceData>(
    "currentInvoice",
    defaultInvoiceData(),
  );

  return (
    <Layout
      form={
        <div className="rounded-card bg-white border border-ink-100 shadow-card p-4">
          <p className="text-sm text-ink-500">
            Form sections go here (next features)
          </p>
        </div>
      }
      preview={
        <div className="rounded-card bg-white border border-ink-100 shadow-card p-4">
          <p className="text-sm text-ink-500">
            Live preview goes here (feature 8)
          </p>
        </div>
      }
    />
  );
};

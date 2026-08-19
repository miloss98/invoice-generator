import { Layout } from "./components/Layout";
import { CompanyInfoForm } from "./components/CompanyInfoForm";
import { ClientForm } from "./components/ClientForm";
import { InvoiceMetaForm } from "./components/InvoiceMetaForm";
import { LineItemsForm } from "./components/LineItemsForm";
import { PaymentDetailsForm } from "./components/PaymentsDetailsForm";
import { InvoicePreview } from "./components/InvoicePreview";
import { DownloadButton } from "./components/DownloadButton";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { defaultCompanyInfo, defaultInvoiceData } from "./utils/defaults";
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
          <PaymentDetailsForm
            invoiceData={invoiceData}
            onChange={setInvoiceData}
          />
        </>
      }
      preview={
        <div className="space-y-4">
          <InvoicePreview companyInfo={companyInfo} invoiceData={invoiceData} />
          <DownloadButton companyInfo={companyInfo} invoiceData={invoiceData} />
        </div>
      }
    />
  );
};

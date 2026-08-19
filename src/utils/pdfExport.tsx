import { pdf } from "@react-pdf/renderer";
import { InvoicePdfDocument } from "../pdf/InvoicePdfDocument";
import { registerPdfFonts } from "../pdf/registerFonts";
import type { CompanyInfo, InvoiceData } from "../types/invoice";

export async function exportInvoiceToPDF(
  companyInfo: CompanyInfo,
  invoiceData: InvoiceData,
): Promise<void> {
  await registerPdfFonts();

  const blob = await pdf(
    <InvoicePdfDocument companyInfo={companyInfo} invoiceData={invoiceData} />,
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `invoice-${invoiceData.invoiceNumber}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

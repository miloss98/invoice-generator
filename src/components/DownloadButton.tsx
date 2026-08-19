import { useState } from "react";
import { exportInvoiceToPDF } from "../utils/pdfExport";
import type { CompanyInfo, InvoiceData } from "../types/invoice";

interface DownloadButtonProps {
  companyInfo: CompanyInfo;
  invoiceData: InvoiceData;
}

export const DownloadButton = ({
  companyInfo,
  invoiceData,
}: DownloadButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownload = async () => {
    setIsExporting(true);
    try {
      await exportInvoiceToPDF(companyInfo, invoiceData);
    } catch (error) {
      console.error("PDF export failed:", error);
      alert("Something went wrong exporting the PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isExporting}
      className="w-full px-4 py-2.5 rounded bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isExporting ? "Generating PDF…" : "Download PDF"}
    </button>
  );
};

import type { CompanyInfo, InvoiceData } from "../types/invoice";
import { getCurrencySymbol } from "../utils/currencies";
import { calculateTotal } from "../utils/calculations";

interface InvoicePreviewPdfProps {
  companyInfo: CompanyInfo;
  invoiceData: InvoiceData;
}

/**
 * Black & white version of the invoice, used only for PDF export.
 * Rendered off-screen (not display:none, so html2canvas can still
 * measure and capture it) and kept in sync with the same data as
 * the on-screen colored preview.
 */
export const InvoicePreviewPdf = ({
  companyInfo,
  invoiceData,
}: InvoicePreviewPdfProps) => {
  const symbol = getCurrencySymbol(invoiceData.currency);
  const total = calculateTotal(invoiceData.items);

  return (
    <div
      style={{ position: "fixed", top: 0, left: "-9999px", width: "794px" }}
      aria-hidden="true"
    >
      <div id="invoice-preview-pdf" className="bg-white text-black">
        {/* Header band */}
        <div className="px-8 py-6 flex items-start justify-between border-b-2 border-black">
          <div className="flex items-center gap-3">
            {companyInfo.logo && (
              <img
                src={companyInfo.logo}
                alt="Company logo"
                className="w-12 h-12 object-contain grayscale"
              />
            )}
            <div>
              <p className="text-black text-lg font-medium">
                {companyInfo.name || "Your company"}
              </p>
              <p className="text-gray-700 text-xs mt-0.5">
                {[companyInfo.email, companyInfo.phone]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-black text-2xl font-medium tracking-wide">
              INVOICE
            </p>
            <p className="text-gray-700 text-xs font-mono mt-1">
              {invoiceData.invoiceNumber}
            </p>
          </div>
        </div>

        <div className="p-8">
          {/* Meta grid */}
          <div className="grid grid-cols-3 gap-6 mb-8 text-sm">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">From</p>
              <p className="text-black font-medium">
                {companyInfo.name || "—"}
              </p>
              <p className="text-gray-700">{companyInfo.address}</p>
              <p className="text-gray-700">
                {[companyInfo.city, companyInfo.postalCode]
                  .filter(Boolean)
                  .join(" ")}
              </p>
              <p className="text-gray-700">{companyInfo.country}</p>
              {companyInfo.taxId && (
                <p className="text-gray-700 text-xs mt-1">
                  Tax ID: {companyInfo.taxId}
                </p>
              )}
            </div>

            <div>
              <p className="text-xs font-medium text-gray-500 mb-1">Bill to</p>
              <p className="text-black font-medium">
                {invoiceData.client.name || "—"}
              </p>
              <p className="text-gray-700">{invoiceData.client.email}</p>
              <p className="text-gray-700 whitespace-pre-line">
                {invoiceData.client.address}
              </p>
            </div>

            <div className="font-mono">
              <div className="mb-2">
                <p className="text-xs font-medium text-gray-500 mb-0.5">
                  Issue date
                </p>
                <p className="text-black">{invoiceData.date}</p>
              </div>
              <div className="mb-2">
                <p className="text-xs font-medium text-gray-500 mb-0.5">
                  Due date
                </p>
                <p className="text-black">{invoiceData.dueDate}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 mb-0.5">
                  Terms
                </p>
                <p className="text-black">{invoiceData.paymentTerms}</p>
              </div>
            </div>
          </div>

          {/* Line items table */}
          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b-2 border-black">
                <th className="text-left py-2 font-medium text-black">
                  Description
                </th>
                <th className="text-right py-2 font-medium text-black w-16">
                  Qty
                </th>
                <th className="text-right py-2 font-medium text-black w-24">
                  Rate
                </th>
                <th className="text-right py-2 font-medium text-black w-24">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr key={item.id} className="border-b border-gray-300">
                  <td className="py-2.5 text-black">
                    {item.description || "—"}
                  </td>
                  <td className="py-2.5 text-right font-mono text-black">
                    {item.quantity}
                  </td>
                  <td className="py-2.5 text-right font-mono text-black">
                    {symbol}
                    {item.rate.toFixed(2)}
                  </td>
                  <td className="py-2.5 text-right font-mono text-black">
                    {symbol}
                    {(item.quantity * item.rate).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div className="flex justify-end mb-8">
            <div className="w-56 flex justify-between items-center pt-3 border-t-2 border-black">
              <span className="text-md font-medium text-black">Total</span>
              <span className="font-mono text-lg font-medium text-black">
                {symbol}
                {total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Payment details */}
          {invoiceData.paymentDetails && (
            <div className="mb-8 text-xs">
              <p className="font-medium text-gray-500 mb-1">Payment details</p>
              <p className="text-gray-800 whitespace-pre-line">
                {invoiceData.paymentDetails}
              </p>
            </div>
          )}

          {/* Signature */}
          {invoiceData.signature && (
            <div className="pt-4 border-t border-gray-300">
              <p className="font-signature text-signature text-black">
                {invoiceData.signature}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                Authorized signature
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

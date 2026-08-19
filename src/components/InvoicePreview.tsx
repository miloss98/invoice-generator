import type { CompanyInfo, InvoiceData } from "../types/invoice";
import { getCurrencySymbol } from "../utils/currencies";
import { calculateTotal } from "../utils/calculations";

interface InvoicePreviewProps {
  companyInfo: CompanyInfo;
  invoiceData: InvoiceData;
}

export const InvoicePreview = ({
  companyInfo,
  invoiceData,
}: InvoicePreviewProps) => {
  const symbol = getCurrencySymbol(invoiceData.currency);
  const total = calculateTotal(invoiceData.items);

  return (
    <div
      id="invoice-preview"
      className="bg-white rounded-card border border-ink-100 shadow-card overflow-hidden"
    >
      {/* Header band */}
      <div className="bg-primary-400 px-8 py-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          {companyInfo.logo && (
            <img
              src={companyInfo.logo}
              alt="Company logo"
              className="w-12 h-12 rounded object-contain bg-white/90 p-1"
            />
          )}
          <div>
            <p className="text-white text-lg font-medium">
              {companyInfo.name || "Your company"}
            </p>
            <p className="text-primary-50 text-xs mt-0.5">
              {[companyInfo.email, companyInfo.phone]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-white text-xl font-medium tracking-wide">
            INVOICE
          </p>
          <p className="text-primary-50 text-xs font-mono mt-1">
            {invoiceData.invoiceNumber}
          </p>
        </div>
      </div>

      <div className="p-8">
        {/* Meta grid: sender / bill-to / dates */}
        <div className="grid grid-cols-3 gap-6 mb-8 text-sm">
          <div>
            <p className="text-xs font-medium text-ink-400 mb-1">From</p>
            <p className="text-ink-900 font-medium">
              {companyInfo.name || "—"}
            </p>
            <p className="text-ink-500">{companyInfo.address}</p>
            <p className="text-ink-500">
              {[companyInfo.city, companyInfo.postalCode]
                .filter(Boolean)
                .join(" ")}
            </p>
            <p className="text-ink-500">{companyInfo.country}</p>
            {companyInfo.taxId && (
              <p className="text-ink-500 text-xs mt-1">
                Tax ID: {companyInfo.taxId}
              </p>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-ink-400 mb-1">Bill to</p>
            <p className="text-ink-900 font-medium">
              {invoiceData.client.name || "—"}
            </p>
            <p className="text-ink-500">{invoiceData.client.email}</p>
            <p className="text-ink-500 whitespace-pre-line">
              {invoiceData.client.address}
            </p>
          </div>

          <div className="font-mono">
            <div className="mb-2">
              <p className="text-xs font-medium text-ink-400 mb-0.5">
                Issue date
              </p>
              <p className="text-ink-900">{invoiceData.date}</p>
            </div>
            <div className="mb-2">
              <p className="text-xs font-medium text-ink-400 mb-0.5">
                Due date
              </p>
              <p className="text-ink-900">{invoiceData.dueDate}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-ink-400 mb-0.5">Terms</p>
              <p className="text-ink-900">{invoiceData.paymentTerms}</p>
            </div>
          </div>
        </div>

        {/* Line items table */}
        <table className="w-full text-sm mb-6">
          <thead>
            <tr className="border-b-2 border-primary-400">
              <th className="text-left py-2 font-medium text-ink-700">
                Description
              </th>
              <th className="text-right py-2 font-medium text-ink-700 w-16">
                Qty
              </th>
              <th className="text-right py-2 font-medium text-ink-700 w-24">
                Rate
              </th>
              <th className="text-right py-2 font-medium text-ink-700 w-24">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item) => (
              <tr key={item.id} className="border-b border-ink-100">
                <td className="py-2.5 text-ink-900">
                  {item.description || "—"}
                </td>
                <td className="py-2.5 text-right font-mono text-ink-700">
                  {item.quantity}
                </td>
                <td className="py-2.5 text-right font-mono text-ink-700">
                  {symbol}
                  {item.rate.toFixed(2)}
                </td>
                <td className="py-2.5 text-right font-mono text-ink-900">
                  {symbol}
                  {(item.quantity * item.rate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="flex justify-end mb-8">
          <div className="w-56 flex justify-between items-center pt-3 border-t-2 border-primary-400">
            <span className="text-md font-medium text-ink-900">Total</span>
            <span className="font-mono text-lg font-medium text-primary-600">
              {symbol}
              {total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment details */}
        {invoiceData.paymentDetails && (
          <div className="mb-8 text-xs">
            <p className="font-medium text-ink-400 mb-1">Payment details</p>
            <p className="text-ink-600 whitespace-pre-line">
              {invoiceData.paymentDetails}
            </p>
          </div>
        )}

        {/* Signature */}
        {invoiceData.signature && (
          <div className="pt-4 border-t border-ink-100">
            <p className="font-signature text-signature text-ink-900">
              {invoiceData.signature}
            </p>
            <p className="text-xs text-ink-400 mt-0.5">Authorized signature</p>
          </div>
        )}
      </div>
    </div>
  );
};

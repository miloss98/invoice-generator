import type { ChangeEvent } from "react";
import type { InvoiceData } from "../types/invoice";
import { currencies } from "../utils/currencies";

interface InvoiceMetaFormProps {
  invoiceData: InvoiceData;
  onChange: (invoiceData: InvoiceData) => void;
}

const paymentTermsOptions = [
  "Due on receipt",
  "Net 7",
  "Net 15",
  "Net 30",
  "Net 60",
];

export const InvoiceMetaForm = ({
  invoiceData,
  onChange,
}: InvoiceMetaFormProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    onChange({ ...invoiceData, [name]: value });
  };

  return (
    <section className="rounded-card bg-white border border-ink-100 shadow-card p-5">
      <h2 className="text-md font-medium text-ink-900 mb-4">Invoice details</h2>

      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1">
              Invoice number
            </label>
            <input
              type="text"
              name="invoiceNumber"
              value={invoiceData.invoiceNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-ink-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1">
              Currency
            </label>
            <select
              name="currency"
              value={invoiceData.currency}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent bg-white"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1">
              Issue date
            </label>
            <input
              type="date"
              name="date"
              value={invoiceData.date}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-500 mb-1">
              Due date
            </label>
            <input
              type="date"
              name="dueDate"
              value={invoiceData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-500 mb-1">
            Payment terms
          </label>
          <select
            name="paymentTerms"
            value={invoiceData.paymentTerms}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent bg-white"
          >
            {paymentTermsOptions.map((term) => (
              <option key={term} value={term}>
                {term}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
};

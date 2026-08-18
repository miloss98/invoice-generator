import type { ChangeEvent } from "react";
import type { InvoiceData } from "../types/invoice";

interface PaymentDetailsFormProps {
  invoiceData: InvoiceData;
  onChange: (invoiceData: InvoiceData) => void;
}

export const PaymentDetailsForm = ({
  invoiceData,
  onChange,
}: PaymentDetailsFormProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    onChange({ ...invoiceData, [name]: value });
  };

  return (
    <section className="rounded-card bg-white border border-ink-100 shadow-card p-5">
      <h2 className="text-md font-medium text-ink-900 mb-4">
        Payment & signature
      </h2>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-ink-500 mb-1">
            Payment details
          </label>
          <textarea
            name="paymentDetails"
            placeholder="Bank name, IBAN / account number, PayPal email, thank-you note, etc."
            value={invoiceData.paymentDetails}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-ink-500 mb-1">
            Signature (typed)
          </label>
          <input
            type="text"
            name="signature"
            placeholder="Your name"
            value={invoiceData.signature}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
          {invoiceData.signature && (
            <p className="font-signature text-signature text-ink-900 mt-2 px-1">
              {invoiceData.signature}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

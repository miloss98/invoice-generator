import { useState } from "react";
import type { InvoiceData } from "../types/invoice";
import { nextInvoiceNumber, emptyLineItem } from "../utils/defaults";

interface ToolbarProps {
  invoiceData: InvoiceData;
  onChange: (invoiceData: InvoiceData) => void;
}

export const Toolbar = ({ invoiceData, onChange }: ToolbarProps) => {
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = () => {
    if (!invoiceData.client.name.trim()) {
      alert("Please enter a client name before saving.");
      return;
    }
    // Data is already persisted automatically via useLocalStorage on every
    // change; this button exists to give explicit, reassuring confirmation.
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const handleNewInvoice = () => {
    const confirmed = window.confirm(
      "Start a new invoice? This clears the line items and notes, but keeps your company and client info.",
    );
    if (!confirmed) return;

    onChange({
      ...invoiceData,
      invoiceNumber: nextInvoiceNumber(invoiceData.invoiceNumber),
      date: new Date().toISOString().split("T")[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      items: [emptyLineItem()],
      notes: "",
      status: "unpaid",
    });
  };

  const toggleStatus = () => {
    onChange({
      ...invoiceData,
      status: invoiceData.status === "paid" ? "unpaid" : "paid",
    });
  };

  return (
    <section className="rounded-card bg-white border border-ink-100 shadow-card p-4 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleSave}
        className="px-4 py-2 rounded bg-ink-900 text-white text-sm font-medium hover:bg-ink-800 transition-colors"
      >
        {savedMessage ? "Saved ✓" : "Save invoice"}
      </button>

      <button
        type="button"
        onClick={handleNewInvoice}
        className="px-4 py-2 rounded bg-ink-50 text-ink-700 text-sm font-medium hover:bg-ink-100 transition-colors"
      >
        New invoice
      </button>

      <button
        type="button"
        onClick={toggleStatus}
        className={`ml-auto px-4 py-2 rounded text-sm font-medium transition-colors ${
          invoiceData.status === "paid"
            ? "bg-green-50 text-status-paid hover:bg-green-100"
            : "bg-red-50 text-status-unpaid hover:bg-red-100"
        }`}
      >
        Mark as {invoiceData.status === "paid" ? "unpaid" : "paid"}
      </button>
    </section>
  );
};

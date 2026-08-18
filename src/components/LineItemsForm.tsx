import type { LineItem } from "../types/invoice";
import { getCurrencySymbol } from "../utils/currencies";
import { emptyLineItem } from "../utils/defaults";

interface LineItemsFormProps {
  items: LineItem[];
  currency: string;
  onChange: (items: LineItem[]) => void;
}

export const LineItemsForm = ({
  items,
  currency,
  onChange,
}: LineItemsFormProps) => {
  const updateItem = (id: string, field: keyof LineItem, value: string) => {
    onChange(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]:
                field === "description"
                  ? value
                  : Math.max(0, parseFloat(value) || 0),
            }
          : item,
      ),
    );
  };

  const addItem = () => {
    onChange([...items, emptyLineItem()]);
  };

  const removeItem = (id: string) => {
    if (items.length === 1) return; // always keep at least one row
    onChange(items.filter((item) => item.id !== id));
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <section className="rounded-card bg-white border border-ink-100 shadow-card p-5">
      <h2 className="text-md font-medium text-ink-900 mb-4">Line items</h2>

      <div className="space-y-2">
        <div className="grid grid-cols-[1fr_60px_80px_28px] gap-2 px-1">
          <span className="text-xs font-medium text-ink-400">Description</span>
          <span className="text-xs font-medium text-ink-400">Qty</span>
          <span className="text-xs font-medium text-ink-400">
            Rate ({symbol})
          </span>
          <span />
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1fr_60px_80px_28px] gap-2 items-center"
          >
            <input
              type="text"
              placeholder="Service or product"
              value={item.description}
              onChange={(e) =>
                updateItem(item.id, "description", e.target.value)
              }
              className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            />
            <input
              type="number"
              min="0"
              step="1"
              value={item.quantity}
              onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
              className="w-full px-2 py-2 rounded border border-ink-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={item.rate}
              onChange={(e) => updateItem(item.id, "rate", e.target.value)}
              className="w-full px-2 py-2 rounded border border-ink-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              disabled={items.length === 1}
              className="text-ink-400 hover:text-status-unpaid disabled:opacity-30 disabled:cursor-not-allowed text-lg leading-none"
              aria-label="Remove item"
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="w-full mt-2 px-3 py-2 rounded bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          + Add item
        </button>
      </div>
    </section>
  );
};

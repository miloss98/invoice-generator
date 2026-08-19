import type { FocusEvent } from "react";
import { Plus, Bookmark } from "lucide-react";
import type { LineItem } from "../types/invoice";
import { getCurrencySymbol } from "../utils/currencies";
import { emptyLineItem } from "../utils/defaults";
import { useSavedLineItems } from "../hooks/useSavedLineItems";

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
  const { savedLineItems, saveLineItem, deleteLineItem } = useSavedLineItems();

  const updateItem = (id: string, field: keyof LineItem, value: string) => {
    onChange(
      items.map((item) => {
        if (item.id !== id) return item;
        if (field === "description") return { ...item, description: value };

        const parsed = value === "" ? 0 : Math.max(0, parseFloat(value) || 0);
        return { ...item, [field]: parsed };
      }),
    );
  };

  const handleNumericFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const addItem = () => {
    onChange([...items, emptyLineItem()]);
  };

  const removeItem = (id: string) => {
    if (items.length === 1) return;
    onChange(items.filter((item) => item.id !== id));
  };

  const handleSaveItem = (item: LineItem) => {
    if (!item.description.trim()) {
      alert("Add a description before saving this item.");
      return;
    }
    saveLineItem(item.description, item.rate);
  };

  const handleUsePreset = (description: string, rate: number) => {
    onChange([
      ...items,
      { id: crypto.randomUUID(), description, quantity: 1, rate },
    ]);
  };

  const symbol = getCurrencySymbol(currency);

  return (
    <section className="rounded-card bg-white border border-ink-100 shadow-card p-5">
      <h2 className="text-md font-medium text-ink-900 mb-4">Line items</h2>

      <div className="space-y-2">
        <div className="grid grid-cols-[1fr_60px_80px_28px_28px] gap-2 px-1">
          <span className="text-xs font-medium text-ink-400">Description</span>
          <span className="text-xs font-medium text-ink-400">Qty</span>
          <span className="text-xs font-medium text-ink-400">
            Rate ({symbol})
          </span>
          <span />
          <span />
        </div>

        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1fr_60px_80px_28px_28px] gap-2 items-center"
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
              value={item.quantity === 0 ? "" : item.quantity}
              onFocus={handleNumericFocus}
              onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
              placeholder="0"
              className="w-full px-2 py-2 rounded border border-ink-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            />
            <input
              type="number"
              min="0"
              step="0.01"
              value={item.rate === 0 ? "" : item.rate}
              onFocus={handleNumericFocus}
              onChange={(e) => updateItem(item.id, "rate", e.target.value)}
              placeholder="0"
              className="w-full px-2 py-2 rounded border border-ink-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => handleSaveItem(item)}
              className="text-ink-400 hover:text-primary-500"
              aria-label="Save this item for reuse"
              title="Save this item for reuse"
            >
              <Bookmark size={16} />
            </button>
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
          className="w-full mt-2 px-3 py-2 rounded bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          Add item
        </button>
      </div>

      {savedLineItems.length > 0 && (
        <div className="mt-4 pt-4 border-t border-ink-100">
          <p className="text-xs font-medium text-ink-500 mb-2">Saved items</p>
          <div className="flex flex-wrap gap-2">
            {savedLineItems.map((preset) => (
              <div
                key={preset.id}
                className="flex items-center gap-1.5 bg-ink-50 hover:bg-primary-50 rounded-pill pl-3 pr-1.5 py-1 text-xs text-ink-700 hover:text-primary-700 transition-colors"
              >
                <button
                  type="button"
                  onClick={() =>
                    handleUsePreset(preset.description, preset.rate)
                  }
                  className="font-medium"
                >
                  {preset.description} · {symbol}
                  {preset.rate.toFixed(2)}
                </button>
                <button
                  type="button"
                  onClick={() => deleteLineItem(preset.id)}
                  className="text-ink-400 hover:text-status-unpaid"
                  aria-label={`Delete saved item ${preset.description}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

import type { ChangeEvent } from "react";
import type { Client } from "../types/invoice";
import { useSavedClients } from "../hooks/useSavedClients";
import { emptyClient } from "../utils/defaults";

interface ClientFormProps {
  client: Client;
  onChange: (client: Client) => void;
}

export const ClientForm = ({ client, onChange }: ClientFormProps) => {
  const { savedClients, saveClient, deleteClient } = useSavedClients();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    onChange({ ...client, [name]: value });
  };

  const handleSaveClient = () => {
    if (!client.name.trim()) {
      alert("Please enter a client name first.");
      return;
    }
    saveClient(client);
  };

  const handleLoadClient = (saved: Client) => {
    onChange(saved);
  };

  const handleDeleteClient = (e: React.MouseEvent, clientId: string) => {
    e.stopPropagation();
    deleteClient(clientId);
    if (client.id === clientId) {
      onChange(emptyClient());
    }
  };

  return (
    <section className="rounded-card bg-white border border-ink-100 shadow-card p-5">
      <h2 className="text-md font-medium text-ink-900 mb-4">Bill to</h2>

      <div className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Client name"
          value={client.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={client.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={client.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
        </div>

        <textarea
          name="address"
          placeholder="Client address"
          value={client.address}
          onChange={handleChange}
          rows={2}
          className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent resize-none"
        />

        <button
          type="button"
          onClick={handleSaveClient}
          className="w-full px-3 py-2 rounded bg-ink-50 text-ink-700 text-sm font-medium hover:bg-ink-100 transition-colors"
        >
          Save client
        </button>
      </div>

      {savedClients.length > 0 && (
        <div className="mt-4 pt-4 border-t border-ink-100">
          <p className="text-xs font-medium text-ink-500 mb-2">Saved clients</p>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {savedClients.map((saved) => (
              <div
                key={saved.id}
                onClick={() => handleLoadClient(saved)}
                className={`flex items-center justify-between px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                  client.id === saved.id
                    ? "bg-primary-50 text-primary-700"
                    : "bg-ink-50 text-ink-700 hover:bg-primary-50 hover:text-primary-700"
                }`}
              >
                <span className="font-medium truncate">{saved.name}</span>
                <button
                  type="button"
                  onClick={(e) => handleDeleteClient(e, saved.id)}
                  className="text-ink-400 hover:text-status-unpaid ml-2 shrink-0"
                  aria-label={`Delete ${saved.name}`}
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

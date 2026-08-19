import type { ChangeEvent } from "react";
import type { Client } from "../types/invoice";

interface ClientFormProps {
  client: Client;
  onChange: (client: Client) => void;
}

export const ClientForm = ({ client, onChange }: ClientFormProps) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    onChange({ ...client, [name]: value });
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
      </div>
    </section>
  );
};

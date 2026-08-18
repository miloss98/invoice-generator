import { useLocalStorage } from "./useLocalStorage";
import type { Client } from "../types/invoice";

export function useSavedClients() {
  const [savedClients, setSavedClients] = useLocalStorage<Client[]>(
    "savedClients",
    [],
  );

  const saveClient = (client: Client) => {
    if (!client.name.trim()) return;

    const exists = savedClients.some((c) => c.id === client.id);
    if (exists) {
      setSavedClients((prev) =>
        prev.map((c) => (c.id === client.id ? client : c)),
      );
    } else {
      setSavedClients((prev) => [client, ...prev]);
    }
  };

  const deleteClient = (clientId: string) => {
    setSavedClients((prev) => prev.filter((c) => c.id !== clientId));
  };

  return { savedClients, saveClient, deleteClient };
}

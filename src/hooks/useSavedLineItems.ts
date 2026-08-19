import { useLocalStorage } from "./useLocalStorage";
import type { SavedLineItem } from "../types/invoice";

export function useSavedLineItems() {
  const [savedLineItems, setSavedLineItems] = useLocalStorage<SavedLineItem[]>(
    "savedLineItems",
    [],
  );

  const saveLineItem = (description: string, rate: number) => {
    const trimmed = description.trim();
    if (!trimmed) return;

    const alreadySaved = savedLineItems.some(
      (i) => i.description.toLowerCase() === trimmed.toLowerCase(),
    );
    if (alreadySaved) return;

    setSavedLineItems((prev) => [
      { id: crypto.randomUUID(), description: trimmed, rate },
      ...prev,
    ]);
  };

  const deleteLineItem = (id: string) => {
    setSavedLineItems((prev) => prev.filter((i) => i.id !== id));
  };

  return { savedLineItems, saveLineItem, deleteLineItem };
}

const STORAGE_KEYS = ["companyInfo", "currentInvoice", "savedClients"] as const;

export function resetAppData(): void {
  STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  window.location.reload();
}

const BACKUP_KEYS = [
  "companyInfo",
  "currentInvoice",
  "savedClients",
  "savedLineItems",
] as const;

export function exportBackup(): void {
  const backup: Record<string, unknown> = {
    exportedAt: new Date().toISOString(),
  };

  for (const key of BACKUP_KEYS) {
    const raw = localStorage.getItem(key);
    if (raw) backup[key] = JSON.parse(raw);
  }

  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `invoice-generator-backup-${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importBackup(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string) as Record<
          string,
          unknown
        >;
        let restoredAnything = false;

        for (const key of BACKUP_KEYS) {
          if (data[key] !== undefined) {
            localStorage.setItem(key, JSON.stringify(data[key]));
            restoredAnything = true;
          }
        }

        if (!restoredAnything) {
          reject(new Error("No recognizable backup data found in this file."));
          return;
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

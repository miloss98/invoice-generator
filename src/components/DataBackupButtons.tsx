import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Download, Upload } from "lucide-react";
import { exportBackup, importBackup } from "../utils/dataBackup";

export const DataBackupButtons = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const confirmed = window.confirm(
      "Importing will overwrite your current company info, client, invoice, and saved lists. Continue?",
    );
    if (!confirmed) {
      e.target.value = "";
      return;
    }

    setIsImporting(true);
    try {
      await importBackup(file);
      window.location.reload();
    } catch (error) {
      console.error("Import failed:", error);
      alert(
        "This file could not be read as a valid backup. Please check the file and try again.",
      );
    } finally {
      setIsImporting(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={exportBackup}
        aria-label="Export data backup"
        title="Export data backup"
        className="text-primary-50 hover:text-white hover:bg-white/10 rounded p-2 transition-colors"
      >
        <Download size={18} />
      </button>

      <button
        type="button"
        onClick={handleImportClick}
        disabled={isImporting}
        aria-label="Import data backup"
        title="Import data backup"
        className="text-primary-50 hover:text-white hover:bg-white/10 rounded p-2 transition-colors disabled:opacity-50"
      >
        <Upload size={18} />
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

import { RefreshCw } from "lucide-react";

export const ResetDataButton = () => {
  const handleReset = () => {
    const confirmed = window.confirm(
      "This clears all saved data (company info, client, invoice, saved clients) and cannot be undone. Continue?",
    );
    if (!confirmed) return;

    import("../utils/resetData").then(({ resetAppData }) => resetAppData());
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      aria-label="Reset data"
      title="Reset data"
      className="text-base bg-white rounded p-2 hover:bg-red-100 transition-colors shrink-0 text-red-500 flex items-center gap-2"
    >
      <span className="hidden md:flex"> Reset </span>
      <RefreshCw size={14} />
    </button>
  );
};

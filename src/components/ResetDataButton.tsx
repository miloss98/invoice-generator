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
      className="text-primary-50 text-xs underline hover:text-white transition-colors shrink-0"
    >
      Reset data
    </button>
  );
};

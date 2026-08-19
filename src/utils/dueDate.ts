const TERM_DAYS: Record<string, number> = {
  "Due on receipt": 0,
  "Net 7": 7,
  "Net 15": 15,
  "Net 30": 30,
  "Net 60": 60,
};

export function calculateDueDate(
  issueDate: string,
  paymentTerms: string,
): string {
  const days = TERM_DAYS[paymentTerms];
  if (days === undefined || !issueDate) return issueDate;

  const base = new Date(issueDate);
  if (Number.isNaN(base.getTime())) return issueDate;

  base.setDate(base.getDate() + days);
  return base.toISOString().split("T")[0];
}

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { CompanyInfo, InvoiceData } from "../types/invoice";
import { getCurrencySymbol } from "./currencies";
import { calculateTotal } from "./calculations";

const MARGIN = 15;
const PAGE_WIDTH = 210;

const INK = [20, 20, 20] as const;
const GRAY_LABEL = [140, 140, 140] as const;
const GRAY_TEXT = [90, 90, 90] as const;
const GRAY_LINE = [210, 210, 210] as const;

export function exportInvoiceToPDF(
  companyInfo: CompanyInfo,
  invoiceData: InvoiceData,
): void {
  const doc = new jsPDF("p", "mm", "a4");
  const symbol = getCurrencySymbol(invoiceData.currency);
  const total = calculateTotal(invoiceData.items);
  const hasLogo = Boolean(companyInfo.logo);
  const rightBlockX = PAGE_WIDTH - MARGIN - (hasLogo ? 24 : 0);

  let y = MARGIN;

  // Logo, top right
  if (companyInfo.logo) {
    try {
      doc.addImage(
        companyInfo.logo,
        "PNG",
        PAGE_WIDTH - MARGIN - 20,
        y,
        20,
        20,
        undefined,
        "FAST",
      );
    } catch {
      // Unsupported format for direct embed (e.g. unusual mime type) — skip silently
    }
  }

  // Company name + contact (top left)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...INK);
  doc.text(companyInfo.name || "Your company", MARGIN, y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GRAY_TEXT);
  const contactLine = [companyInfo.email, companyInfo.phone]
    .filter(Boolean)
    .join("   ·   ");
  if (contactLine) doc.text(contactLine, MARGIN, y + 12);

  // "INVOICE" + number (top right)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...INK);
  doc.text("INVOICE", rightBlockX, y + 6, { align: "right" });

  doc.setFont("courier", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...GRAY_TEXT);
  doc.text(invoiceData.invoiceNumber, rightBlockX, y + 12, { align: "right" });

  y += 20;
  doc.setDrawColor(...INK);
  doc.setLineWidth(0.5);
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
  y += 10;

  // Three columns: From / Bill to / Details
  const col1X = MARGIN;
  const col2X = MARGIN + 62;
  const col3X = MARGIN + 124;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...GRAY_LABEL);
  doc.text("FROM", col1X, y);
  doc.text("BILL TO", col2X, y);
  doc.text("DETAILS", col3X, y);

  let yFrom = y + 5;
  let yBill = y + 5;
  let yDetails = y + 5;

  // From
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(...INK);
  doc.text(companyInfo.name || "—", col1X, yFrom);
  yFrom += 5;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY_TEXT);
  if (companyInfo.address) {
    doc.text(companyInfo.address, col1X, yFrom);
    yFrom += 4.5;
  }
  const cityLine = [companyInfo.city, companyInfo.postalCode]
    .filter(Boolean)
    .join(" ");
  if (cityLine) {
    doc.text(cityLine, col1X, yFrom);
    yFrom += 4.5;
  }
  if (companyInfo.country) {
    doc.text(companyInfo.country, col1X, yFrom);
    yFrom += 4.5;
  }
  if (companyInfo.taxId) {
    doc.setFontSize(8);
    doc.text(`Tax ID: ${companyInfo.taxId}`, col1X, yFrom);
    yFrom += 4.5;
    doc.setFontSize(9.5);
  }

  // Bill to
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...INK);
  doc.text(invoiceData.client.name || "—", col2X, yBill);
  yBill += 5;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(...GRAY_TEXT);
  if (invoiceData.client.email) {
    doc.text(invoiceData.client.email, col2X, yBill);
    yBill += 4.5;
  }
  if (invoiceData.client.address) {
    const addrLines = doc.splitTextToSize(
      invoiceData.client.address,
      55,
    ) as string[];
    doc.text(addrLines, col2X, yBill);
    yBill += addrLines.length * 4.5;
  }

  // Details (dates, terms)
  const detailRow = (label: string, value: string) => {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GRAY_TEXT);
    doc.text(label, col3X, yDetails);
    doc.setFont("courier", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...INK);
    doc.text(value, col3X, yDetails + 4);
    yDetails += 10;
  };
  detailRow("Issue date", invoiceData.date);
  detailRow("Due date", invoiceData.dueDate);
  detailRow("Terms", invoiceData.paymentTerms);

  const metaBottom = Math.max(yFrom, yBill, yDetails) + 6;

  // Line items table
  autoTable(doc, {
    startY: metaBottom,
    margin: { left: MARGIN, right: MARGIN },
    head: [["Description", "Qty", "Rate", "Amount"]],
    body: invoiceData.items.map((item) => [
      item.description || "—",
      String(item.quantity),
      `${symbol}${item.rate.toFixed(2)}`,
      `${symbol}${(item.quantity * item.rate).toFixed(2)}`,
    ]),
    theme: "plain",
    styles: {
      font: "helvetica",
      fontSize: 9.5,
      textColor: INK as unknown as number[],
      cellPadding: { top: 3, bottom: 3, left: 0, right: 0 },
    },
    headStyles: {
      fontStyle: "bold",
      textColor: INK as unknown as number[],
      lineWidth: { bottom: 0.5 },
      lineColor: INK as unknown as number[],
    },
    bodyStyles: {
      lineWidth: { bottom: 0.2 },
      lineColor: GRAY_LINE as unknown as number[],
    },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { cellWidth: 18, halign: "right" },
      2: { cellWidth: 28, halign: "right", font: "courier" },
      3: { cellWidth: 28, halign: "right", font: "courier" },
    },
  });

  // @ts-expect-error - lastAutoTable is attached to the doc instance at runtime by the plugin
  let y2: number = doc.lastAutoTable.finalY + 10;

  // Total
  doc.setDrawColor(...INK);
  doc.setLineWidth(0.5);
  doc.line(PAGE_WIDTH - MARGIN - 60, y2 - 5, PAGE_WIDTH - MARGIN, y2 - 5);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...INK);
  doc.text("Total", PAGE_WIDTH - MARGIN - 60, y2);
  doc.setFont("courier", "bold");
  doc.text(`${symbol}${total.toFixed(2)}`, PAGE_WIDTH - MARGIN, y2, {
    align: "right",
  });

  y2 += 14;

  // Payment details
  if (invoiceData.paymentDetails) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...GRAY_LABEL);
    doc.text("PAYMENT DETAILS", MARGIN, y2);
    y2 += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(70, 70, 70);
    const lines = doc.splitTextToSize(
      invoiceData.paymentDetails,
      PAGE_WIDTH - MARGIN * 2,
    ) as string[];
    doc.text(lines, MARGIN, y2);
    y2 += lines.length * 4.5 + 8;
  }

  // Signature
  if (invoiceData.signature) {
    doc.setDrawColor(...GRAY_LINE);
    doc.setLineWidth(0.2);
    doc.line(MARGIN, y2, MARGIN + 60, y2);
    y2 += 6;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(13);
    doc.setTextColor(...INK);
    doc.text(invoiceData.signature, MARGIN, y2);
    y2 += 4.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...GRAY_LABEL);
    doc.text("Authorized signature", MARGIN, y2);
  }

  doc.save(`invoice-${invoiceData.invoiceNumber}.pdf`);
}

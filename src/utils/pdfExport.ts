import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportInvoiceToPDF(
  elementId: string,
  filename: string,
): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Fit the full canvas within one A4 page, preserving aspect ratio.
  // Scale by whichever dimension is more constrained.
  const widthRatio = pageWidth / canvas.width;
  const heightRatio = pageHeight / canvas.height;
  const scale = Math.min(widthRatio, heightRatio);

  const finalWidth = canvas.width * scale;
  const finalHeight = canvas.height * scale;

  const xOffset = (pageWidth - finalWidth) / 2;
  const yOffset = 0;

  pdf.addImage(
    imgData,
    "PNG",
    xOffset,
    yOffset,
    finalWidth,
    finalHeight,
    undefined,
    "FAST",
  );
  pdf.save(filename);
}

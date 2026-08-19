import { Font } from "@react-pdf/renderer";

let registered = false;

async function fetchAsDataUri(url: string, mimeType: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  let binary = "";
  const chunkSize = 0x8000; // avoid call-stack limits when spreading large byte arrays
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return `data:${mimeType};base64,${btoa(binary)}`;
}

export async function registerPdfFonts(): Promise<void> {
  if (registered) return;

  const [interRegular, interBold, caveat] = await Promise.all([
    fetchAsDataUri("/fonts/OpenSans-Regular.ttf", "font/ttf"),
    fetchAsDataUri("/fonts/OpenSans-Bold.ttf", "font/ttf"),
    fetchAsDataUri("/fonts/Caveat-Medium.ttf", "font/ttf"),
  ]);

  Font.register({
    family: "Inter",
    fonts: [
      { src: interRegular, fontWeight: "normal" },
      { src: interBold, fontWeight: "bold" },
    ],
  });

  Font.register({
    family: "Caveat",
    src: caveat,
  });

  Font.registerHyphenationCallback((word) => [word]);

  registered = true;
}

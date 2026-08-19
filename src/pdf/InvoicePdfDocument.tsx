import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import type { CompanyInfo, InvoiceData } from "../types/invoice";
import { getCurrencySymbol } from "../utils/currencies";
import { calculateTotal } from "../utils/calculations";

const INK = "#1e1e1e";
const GRAY_LABEL = "#828282";
const GRAY_TEXT = "#5f5f5f";
const GRAY_LINE = "#d7d7d7";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    fontSize: 9.5,
    color: INK,
    padding: 42,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 56,
    height: 56,
    objectFit: "contain",
    marginRight: 10,
  },
  companyName: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: 16,
    color: INK,
  },
  contactLine: {
    fontSize: 9.5,
    color: GRAY_TEXT,
    marginTop: 3,
  },
  invoiceTitle: {
    fontFamily: "Inter",
    fontWeight: "bold",
    fontSize: 20,
    color: INK,
    textAlign: "right",
  },
  invoiceNumber: {
    fontSize: 9.5,
    color: GRAY_TEXT,
    textAlign: "right",
    marginTop: 3,
  },
  divider: {
    borderBottomWidth: 1.2,
    borderBottomColor: INK,
    marginTop: 24,
    marginBottom: 28,
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 24,
  },
  metaCol: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: GRAY_LABEL,
    marginBottom: 6,
  },
  metaName: {
    fontWeight: "bold",
    fontSize: 10,
    color: INK,
    marginBottom: 3,
  },
  metaText: {
    fontSize: 9.5,
    color: GRAY_TEXT,
    marginBottom: 3,
  },
  detailItem: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 8,
    color: GRAY_TEXT,
    marginBottom: 2,
  },
  detailValue: {
    fontWeight: "bold",
    fontSize: 9.5,
    color: INK,
  },
  tableHeaderRow: {
    flexDirection: "row",
    borderBottomWidth: 1.2,
    borderBottomColor: INK,
    paddingBottom: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY_LINE,
    paddingVertical: 9,
  },
  colDescription: { flex: 1 },
  colQty: { width: 45, textAlign: "right" },
  colRate: { width: 70, textAlign: "right" },
  colAmount: { width: 70, textAlign: "right" },
  tableHeaderText: {
    fontWeight: "bold",
    fontSize: 9,
    color: INK,
  },
  cellText: {
    fontSize: 10.5,
    color: INK,
  },
  cellAmountText: {
    fontSize: 10.5,
    fontWeight: "bold",
    color: INK,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  totalBox: {
    width: 170,
    borderTopWidth: 1.2,
    borderTopColor: INK,
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalLabel: {
    fontWeight: "bold",
    fontSize: 12,
    color: INK,
  },
  totalValue: {
    fontWeight: "bold",
    fontSize: 12,
    color: INK,
  },
  paymentSection: {
    marginTop: 32,
  },
  paymentLabel: {
    fontSize: 8,
    fontWeight: "bold",
    color: GRAY_LABEL,
    marginBottom: 6,
  },
  paymentText: {
    fontSize: 9.5,
    color: "#464646",
    lineHeight: 1.5,
  },
  signatureSection: {
    marginTop: 32,
  },
  signatureLine: {
    width: 170,
    borderBottomWidth: 0.5,
    borderBottomColor: GRAY_LINE,
    marginBottom: 10,
  },
  signatureText: {
    fontFamily: "Caveat",
    fontSize: 26,
    color: INK,
  },
  signatureCaption: {
    fontSize: 7.5,
    color: GRAY_LABEL,
    marginTop: 4,
  },
});

interface InvoicePdfDocumentProps {
  companyInfo: CompanyInfo;
  invoiceData: InvoiceData;
}

export const InvoicePdfDocument = ({
  companyInfo,
  invoiceData,
}: InvoicePdfDocumentProps) => {
  const symbol = getCurrencySymbol(invoiceData.currency);
  const total = calculateTotal(invoiceData.items);
  const cityLine = [companyInfo.city, companyInfo.postalCode]
    .filter(Boolean)
    .join(" ");
  const contactLine = [companyInfo.email, companyInfo.phone]
    .filter(Boolean)
    .join("   ·   ");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            {companyInfo.logo && (
              <Image src={companyInfo.logo} style={styles.logo} />
            )}
            <View>
              <Text style={styles.companyName}>
                {companyInfo.name || "Your company"}
              </Text>
              {contactLine ? (
                <Text style={styles.contactLine}>{contactLine}</Text>
              ) : null}
            </View>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>
              {invoiceData.invoiceNumber}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.metaRow}>
          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>FROM</Text>
            <Text style={styles.metaName}>{companyInfo.name || "—"}</Text>
            {companyInfo.address ? (
              <Text style={styles.metaText}>{companyInfo.address}</Text>
            ) : null}
            {cityLine ? <Text style={styles.metaText}>{cityLine}</Text> : null}
            {companyInfo.country ? (
              <Text style={styles.metaText}>{companyInfo.country}</Text>
            ) : null}
            {companyInfo.taxId ? (
              <Text style={[styles.metaText, { fontSize: 8.5 }]}>
                Tax ID: {companyInfo.taxId}
              </Text>
            ) : null}
          </View>

          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>BILL TO</Text>
            <Text style={styles.metaName}>
              {invoiceData.client.name || "—"}
            </Text>
            {invoiceData.client.email ? (
              <Text style={styles.metaText}>{invoiceData.client.email}</Text>
            ) : null}
            {invoiceData.client.address ? (
              <Text style={styles.metaText}>{invoiceData.client.address}</Text>
            ) : null}
          </View>

          <View style={styles.metaCol}>
            <Text style={styles.metaLabel}>DETAILS</Text>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Issue date</Text>
              <Text style={styles.detailValue}>{invoiceData.date}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Due date</Text>
              <Text style={styles.detailValue}>{invoiceData.dueDate}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Terms</Text>
              <Text style={styles.detailValue}>{invoiceData.paymentTerms}</Text>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.tableHeaderRow}>
            <Text style={[styles.tableHeaderText, styles.colDescription]}>
              Description
            </Text>
            <Text style={[styles.tableHeaderText, styles.colQty]}>Qty</Text>
            <Text style={[styles.tableHeaderText, styles.colRate]}>Rate</Text>
            <Text style={[styles.tableHeaderText, styles.colAmount]}>
              Amount
            </Text>
          </View>

          {invoiceData.items.map((item) => (
            <View style={styles.tableRow} key={item.id}>
              <Text style={[styles.cellText, styles.colDescription]}>
                {item.description || "—"}
              </Text>
              <Text style={[styles.cellText, styles.colQty]}>
                {item.quantity}
              </Text>
              <Text style={[styles.cellText, styles.colRate]}>
                {symbol}
                {item.rate.toFixed(2)}
              </Text>
              <Text style={[styles.cellAmountText, styles.colAmount]}>
                {symbol}
                {(item.quantity * item.rate).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalRow}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>
              {symbol}
              {total.toFixed(2)}
            </Text>
          </View>
        </View>

        {invoiceData.paymentDetails ? (
          <View style={styles.paymentSection}>
            <Text style={styles.paymentLabel}>PAYMENT DETAILS</Text>
            <Text style={styles.paymentText}>{invoiceData.paymentDetails}</Text>
          </View>
        ) : null}

        {invoiceData.signature ? (
          <View style={styles.signatureSection}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureText}>{invoiceData.signature}</Text>
            <Text style={styles.signatureCaption}>Authorized signature</Text>
          </View>
        ) : null}
      </Page>
    </Document>
  );
};

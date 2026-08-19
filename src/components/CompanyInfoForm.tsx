import type { ChangeEvent } from "react";
import type { CompanyInfo } from "../types/invoice";

interface CompanyInfoFormProps {
  companyInfo: CompanyInfo;
  onChange: (companyInfo: CompanyInfo) => void;
}

export const CompanyInfoForm = ({
  companyInfo,
  onChange,
}: CompanyInfoFormProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ ...companyInfo, [name]: value });
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 500_000) {
      alert("Logo is too large. Please use an image under 500KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      onChange({ ...companyInfo, logo: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    onChange({ ...companyInfo, logo: null });
  };

  return (
    <section className="rounded-card bg-white border border-ink-100 shadow-card p-5">
      <div className="flex items-start justify-between mb-3">
        <h2 className="text-md font-medium text-ink-900">Your business</h2>

        {companyInfo.logo ? (
          <div className="flex items-center gap-2">
            <img
              src={companyInfo.logo}
              alt="Company logo"
              className="w-10 h-10 rounded object-contain border border-ink-100"
            />
            <button
              type="button"
              onClick={removeLogo}
              className="text-xs text-status-unpaid hover:underline"
            >
              Remove
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center w-10 h-10 rounded border border-dashed border-ink-200 text-ink-400 text-[10px] cursor-pointer hover:border-primary-400 hover:text-primary-400 transition-colors shrink-0">
            Logo
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="text"
            name="name"
            placeholder="Company name"
            value={companyInfo.name}
            onChange={handleChange}
            className="w-full px-3 py-1.5 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={companyInfo.email}
            onChange={handleChange}
            className="w-full px-3 py-1.5 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={companyInfo.phone}
            onChange={handleChange}
            className="w-full px-3 py-1.5 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
          <input
            type="text"
            name="taxId"
            placeholder="Tax ID / VAT (optional)"
            value={companyInfo.taxId}
            onChange={handleChange}
            className="w-full px-3 py-1.5 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Street address"
          value={companyInfo.address}
          onChange={handleChange}
          className="w-full px-3 py-1.5 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={companyInfo.city}
            onChange={handleChange}
            className="w-full px-3 py-1.5 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal code"
            value={companyInfo.postalCode}
            onChange={handleChange}
            className="w-full px-3 py-1.5 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={companyInfo.country}
            onChange={handleChange}
            className="w-full px-3 py-1.5 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
        </div>
      </div>
    </section>
  );
};

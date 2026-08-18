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
      <h2 className="text-md font-medium text-ink-900 mb-4">Your business</h2>

      <div className="flex items-center gap-4 mb-4">
        {companyInfo.logo ? (
          <div className="flex items-center gap-3">
            <img
              src={companyInfo.logo}
              alt="Company logo"
              className="w-14 h-14 rounded object-contain border border-ink-100"
            />
            <button
              type="button"
              onClick={removeLogo}
              className="text-xs text-status-unpaid hover:underline"
            >
              Remove logo
            </button>
          </div>
        ) : (
          <label className="flex items-center justify-center w-14 h-14 rounded border border-dashed border-ink-200 text-ink-400 text-xs cursor-pointer hover:border-primary-400 hover:text-primary-400 transition-colors">
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

      <div className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Company name"
          value={companyInfo.name}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={companyInfo.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={companyInfo.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Street address"
          value={companyInfo.address}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={companyInfo.city}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={companyInfo.country}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
          />
        </div>

        <input
          type="text"
          name="taxId"
          placeholder="Tax ID / VAT number (optional)"
          value={companyInfo.taxId}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded border border-ink-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
        />
      </div>
    </section>
  );
};

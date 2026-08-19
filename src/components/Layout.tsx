import type { ReactNode } from "react";
import { ResetDataButton } from "./ResetDataButton";

interface LayoutProps {
  form: ReactNode;
  preview: ReactNode;
}

export const Layout = ({ form, preview }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-ink-50">
      <nav className="bg-primary-400 px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-white text-xl sm:text-2xl font-medium">
              Invoice generator
            </h1>
            <p className="text-primary-50 text-xs mt-0.5">
              Create and manage your invoices
            </p>
          </div>
          <ResetDataButton />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-4">{form}</div>
          <div className="lg:sticky lg:top-8 lg:h-fit">{preview}</div>
        </div>
      </div>
    </div>
  );
};

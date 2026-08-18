import type { ReactNode } from "react";

interface LayoutProps {
  form: ReactNode;
  preview: ReactNode;
}

export const Layout = ({ form, preview }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-ink-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-6">
          <h1 className="text-2xl font-medium text-ink-900">
            Invoice generator
          </h1>
          <p className="text-sm text-ink-500 mt-1">
            Create and manage your invoices
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">{form}</div>
          <div className="lg:sticky lg:top-8 lg:h-fit">{preview}</div>
        </div>
      </div>
    </div>
  );
};

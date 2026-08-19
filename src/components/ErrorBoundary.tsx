import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { resetAppData } from "../utils/resetData";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Invoice generator crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ink-50 flex items-center justify-center p-6">
          <div className="max-w-sm w-full rounded-card bg-white border border-ink-100 shadow-card p-6 text-center">
            <p className="text-md font-medium text-ink-900 mb-2">
              Something went wrong
            </p>
            <p className="text-sm text-ink-500 mb-5">
              The app hit an unexpected error. This is usually caused by
              corrupted saved data. Resetting will clear your saved
              company/client/invoice info and reload the app.
            </p>
            <button
              type="button"
              onClick={resetAppData}
              className="w-full px-4 py-2.5 rounded bg-primary-500 text-white text-sm font-medium hover:bg-primary-600 transition-colors"
            >
              Reset data and reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

export class RootErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: unknown): State {
    return {
      error: error instanceof Error ? error : new Error(typeof error === "string" ? error : "Unknown error"),
    };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App error:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-dvh bg-neutral-950 px-6 py-16 text-neutral-100">
          <h1 className="font-heading text-xl font-bold">Something went wrong</h1>
          <p className="mt-3 max-w-lg text-sm text-neutral-400">
            The app hit an error while loading. Check the browser console for details, then try a hard refresh
            (Ctrl+Shift+R).
          </p>
          <pre className="mt-6 max-h-48 overflow-auto rounded-lg border border-neutral-800 bg-black/50 p-4 text-xs text-amber-200/90">
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

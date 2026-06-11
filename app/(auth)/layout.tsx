import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[url('/blue-bg.avif')] bg-cover bg-center bg-no-repeat">
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        {children}
      </div>
    </div>
  );
}

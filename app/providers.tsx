"use client";

import { GOOGLE_CLIENT_ID } from "@/constants";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID!}>
      {children}
    </GoogleOAuthProvider>
  );
}

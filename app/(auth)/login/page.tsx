"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/auth/card";
import { Input } from "@/components/auth/input";
import { Button } from "@/components/auth/button";
import { Label } from "@/components/auth/label";
import { createAccount, googleLogin } from "@/services/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { ArrowRight, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await createAccount({ email, password });
      if (res.data.status) {
        toast.success(res.data.message);

        if (res.data.response.hasBusiness) {
          localStorage.setItem("user", JSON.stringify(res.data.response?.user));
          router.replace("/dashboard");
        } else {
          router.replace("/setup-business");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    try {
      setLoading(true);
      const res = await googleLogin({ token });
      if (res.data.status) {
        toast.success(res.data.message);

        if (res.data.response.hasBusiness) {
          localStorage.setItem("user", JSON.stringify(res.data.response?.user));
          router.replace("/dashboard");
        } else {
          router.replace("/setup-business");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-sm relative overflow-hidden">
      {/* Decorative glow, purely cosmetic */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: "var(--color-coral)" }}
      />

      <CardHeader className="text-center space-y-2 pb-2 relative">
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]" />
          <span className="font-display font-semibold text-base text-[var(--color-text-primary)]">
            Leado
          </span>
        </div>
        <h2 className="text-lg font-display font-semibold text-[var(--color-text-primary)]">
          Sign in to your account
        </h2>
      </CardHeader>

      <CardContent className="relative">
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <Label>Email</Label>
            <div className="relative">
              <Mail
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
              />
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10"
              />
            </div>
          </div>

          <div>
            <Label>Password</Label>
            <div className="relative">
              <Lock
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
              />
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full mt-2"
            size="default"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
            {!loading && <ArrowRight size={15} />}
          </Button>
        </form>

        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-white/10" />
          <span className="px-3 text-[var(--color-text-muted)] text-xs uppercase tracking-wide">
            Or
          </span>
          <div className="flex-grow h-px bg-white/10" />
        </div>

        <div className="flex justify-center [&>div]:w-full">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              await handleGoogleLogin(credentialResponse);
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            theme={"outline"}
            size="large"
            shape="pill"
          />
        </div>
      </CardContent>
    </Card>
  );
}

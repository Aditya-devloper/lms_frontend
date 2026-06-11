"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  createAccount,
  getOtp,
  googleLogin,
  verifyOtp,
} from "@/services/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";

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
    <Card className="w-full max-w-sm border border-white/30 bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl">
      <CardHeader className="text-center space-y-2 pb-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Sign in to your account
        </h2>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleEmailLogin} className="space-y-5">
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-1">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700"
            size="sm"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <GoogleLogin
          onSuccess={async (credentialResponse) => {
            await handleGoogleLogin(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </CardContent>
    </Card>
  );
}

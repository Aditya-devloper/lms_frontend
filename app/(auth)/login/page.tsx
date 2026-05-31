"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { getOtp, verifyOtp } from "@/services/services";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSendOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      const res = await getOtp({ email });
      if (res.data.status) {
        toast.success(res.data.message);
        setStep("otp");
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

  const handleVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    try {
      setLoading(true);
      const res = await verifyOtp({ email, otp });
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
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-violet-600">LMS</span>
          <span className="text-sm text-muted-foreground">
            Lead Management System
          </span>
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          {step === "email"
            ? "Sign in to your account"
            : "Enter verification code"}
        </h2>
      </CardHeader>

      <CardContent>
        {step === "email" && (
          <form onSubmit={handleSendOtp} className="space-y-5">
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

            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700"
              size="lg"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </Button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <Label>Verification Code</Label>

              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup className="w-full justify-between">
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <Button
              type="submit"
              className="w-full bg-violet-600 hover:bg-violet-700"
              size="lg"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => setStep("email")}
            >
              Change Email
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

"use client";

import { Button } from "@/components/auth/button";
import { Input } from "@/components/auth/input";
import { Label } from "@/components/auth/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/auth/select";
import { businessTypes } from "@/data";
import { createBusiness } from "@/services/services";
import { Building2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface FormData {
  business_name: string;
  business_type: string;
  business_email: string;
  business_phone: string;
}

export default function BusinessSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    business_name: "",
    business_type: "",
    business_email: "",
    business_phone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createBusiness(formData);
      if (res.data.status) {
        toast.success(res.data.message);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.response?.updatedUser),
        );
        router.replace("/dashboard");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error?.message ||
          "Failed to create business",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg glass-strong rounded-2xl relative">
      <div
        className="absolute -top-20 -left-20 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "var(--color-indigo)" }}
      />

      <div className="px-6 pt-7 pb-2 relative text-center">
        <div className="w-11 h-11 rounded-xl bg-[var(--color-coral-soft)] flex items-center justify-center mx-auto mb-3">
          <Building2 size={20} className="text-[var(--color-coral)]" />
        </div>
        <h1 className="text-xl font-display font-semibold text-[var(--color-text-primary)]">
          Set up your business
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          This is what your leads will be organized under
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5 relative">
        {/* Business Name */}
        <div>
          <Label>
            Business Name <span className="text-[var(--color-coral)]">*</span>
          </Label>
          <Input
            type="text"
            name="business_name"
            value={formData.business_name}
            onChange={handleChange}
            required
            placeholder="Enter business name"
          />
        </div>

        {/* Business Type */}
        <div>
          <Label>Business Type</Label>
          <Select
            value={formData.business_type}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, business_type: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>

            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Email & Phone - 2 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="business_email"
              value={formData.business_email}
              onChange={handleChange}
              placeholder="business@example.com"
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              type="tel"
              name="business_phone"
              value={formData.business_phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-3 justify-end">
          <Button type="submit" disabled={loading} size="sm">
            {loading ? "Saving..." : "Save Business"}
          </Button>
        </div>
      </form>
    </div>
  );
}

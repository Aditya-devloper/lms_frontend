"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { businessTypes } from "@/data";
import { createBusiness } from "@/services/services";
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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 ">
      <div className="px-6 pb-0 pt-4 border-gray-200 ">
        <h1 className="text-2xl text-center font-semibold text-gray-900">
          Business Setup
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Business Name */}
        <div>
          <Label>
            Business Name <span className="text-red-500">*</span>
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
            <SelectTrigger className="w-full">
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
        <div className="flex gap-3 pt-4 justify-end">
          <Button
            type="button"
            size={"sm"}
            variant={"outline"}
            onClick={() =>
              setFormData({
                business_name: "",
                business_type: "",
                business_email: "",
                business_phone: "",
              })
            }
          >
            Reset
          </Button>
          <Button type="submit" disabled={loading} size={"sm"}>
            {loading ? "Saving..." : "Save Business"}
          </Button>
        </div>
      </form>
    </div>
  );
}

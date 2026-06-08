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
import { Textarea } from "@/components/ui/textarea";
import { businessTypes } from "@/data";
import { createBusiness } from "@/services/services";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface FormData {
  business_name: string;
  business_type: string;
  image: string;
  address: string;
  business_email: string;
  business_phone: string;
}

export default function BusinessSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    business_name: "",
    business_type: "",
    image: "",
    address: "",
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
      <div className="p-6 border-b border-gray-200 ">
        <h1 className="text-2xl font-semibold text-gray-900">Business Setup</h1>
        <p className="text-sm text-gray-500 mt-1">
          Enter your business information
        </p>
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

        {/* Image URL */}
        <div>
          <Label>Logo URL</Label>
          <Input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/logo.png"
          />
        </div>

        {/* Address */}
        <div>
          <Label>Address</Label>
          <Textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter business address"
          />
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
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Business"}
          </Button>
          <Button
            type="button"
            onClick={() =>
              setFormData({
                business_name: "",
                business_type: "",
                image: "",
                address: "",
                business_email: "",
                business_phone: "",
              })
            }
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}

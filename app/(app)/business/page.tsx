"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building, Mail, Phone, MapPin, Edit, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { getBusiness, updateBusiness } from "@/services/services";
import Loading from "@/components/shared/loading";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { businessTypes } from "@/data";

export default function Business() {
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState({
    business_name: "",
    business_type: "",
    address: "",
    business_email: "",
    business_phone: "",
  });

  const fetchBusiness = async () => {
    try {
      const res = await getBusiness({});
      if (res.data.status) {
        const businessData = res.data.response?.[0];
        setBusiness(businessData);
        setFormData({
          business_name: businessData?.business_name || "",
          business_type: businessData?.business_type || "",
          address: businessData?.address || "",
          business_email: businessData?.business_email || "",
          business_phone: businessData?.business_phone || "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBusiness = async () => {
    setSaving(true);
    try {
      const payload = {
        id: business?._id,
        business_name: formData.business_name,
        business_type: formData.business_type,
        address: formData.address,
        business_email: formData.business_email,
        business_phone: formData.business_phone,
      };
      const res = await updateBusiness(payload);
      if (res.data.status) {
        toast.success(res.data.message || "Business updated successfully");
        await fetchBusiness();
        setIsEditMode(false);
      } else {
        toast.error(res.data.message || "Failed to update business");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    // Reset form data to original business data
    setFormData({
      business_name: business?.business_name || "",
      business_type: business?.business_type || "",
      address: business?.address || "",
      business_email: business?.business_email || "",
      business_phone: business?.business_phone || "",
    });
  };

  useEffect(() => {
    fetchBusiness();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex gap-4 items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Business</h1>
            </div>
            {!isEditMode ? (
              <Button size="sm" onClick={() => setIsEditMode(true)}>
                <Edit className="h-4 w-4 mr-1" />
                Edit Business
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={cancelEdit}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleUpdateBusiness}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>Save Changes</>
                  )}
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* Business Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building className="h-5 w-5" />
                  Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {/* Business Name */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase text-muted-foreground">
                      Business Name
                    </Label>
                    {isEditMode ? (
                      <Input
                        value={formData.business_name}
                        onChange={(e) =>
                          handleChange("business_name", e.target.value)
                        }
                        placeholder="Enter business name"
                      />
                    ) : (
                      <div className="rounded-lg bg-muted/50 p-2">
                        <p className="text-sm font-medium">
                          {business?.business_name || "Not set"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Business Type */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase text-muted-foreground">
                      Business Type
                    </Label>
                    {isEditMode ? (
                      <Select
                        value={formData.business_type}
                        onValueChange={(value) =>
                          handleChange("business_type", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>

                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="rounded-lg bg-muted/50 p-2">
                        <p className="text-sm capitalize">
                          {businessTypes.find(
                            (type) => type.value === business?.business_type,
                          )?.label || "Not set"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Business Email */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase text-muted-foreground">
                      Business Email
                    </Label>
                    {isEditMode ? (
                      <Input
                        type="email"
                        value={formData.business_email}
                        onChange={(e) =>
                          handleChange("business_email", e.target.value)
                        }
                        placeholder="Enter business email"
                      />
                    ) : (
                      <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">
                          {business?.business_email || "Not set"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Business Phone */}
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase text-muted-foreground">
                      Business Phone
                    </Label>
                    {isEditMode ? (
                      <Input
                        type="tel"
                        value={formData.business_phone}
                        onChange={(e) =>
                          handleChange("business_phone", e.target.value)
                        }
                        placeholder="Enter business phone"
                      />
                    ) : (
                      <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">
                          {business?.business_phone || "Not set"}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-xs font-medium uppercase text-muted-foreground">
                      Address
                    </Label>
                    {isEditMode ? (
                      <Textarea
                        value={formData.address}
                        onChange={(e) =>
                          handleChange("address", e.target.value)
                        }
                        placeholder="Enter business address"
                      />
                    ) : (
                      <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-2">
                        <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">
                          {business?.address || "Not set"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subscription Plan Card - Non-editable */}
            {/* <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5" />
                  Subscription Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Current Plan
                      </p>
                      <p className="text-2xl font-bold capitalize">
                        {business?.plan?.name || "Free"}
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <Separator className="my-3" />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Agent Limit
                      </p>
                      <p className="text-lg font-semibold flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {business?.plan?.agent_limit || 1}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Lead Limit
                      </p>
                      <p className="text-lg font-semibold flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {business?.plan?.lead_limit || 50}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {business?.plan?.start_date && (
                    <div className="space-y-2">
                      <Label className="text-xs font-medium uppercase text-muted-foreground">
                        Plan Start Date
                      </Label>
                      <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">
                          {moment(business.plan.start_date).format(
                            "MMMM D, YYYY",
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  {business?.plan?.expiry_date && (
                    <div className="space-y-2">
                      <Label className="text-xs font-medium uppercase text-muted-foreground">
                        Plan Expiry Date
                      </Label>
                      <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">
                          {moment(business.plan.expiry_date).format(
                            "MMMM D, YYYY",
                          )}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {business?.plan?.name === "pro" && (
                  <div className="mt-4 rounded-lg border border-green-200 bg-green-50/30 p-4">
                    <h4 className="mb-3 text-sm font-semibold text-green-700 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Pro Plan Benefits
                    </h4>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs">Unlimited Agents</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs">Unlimited Leads</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs">Priority Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs">Advanced Analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs">Custom Reports</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span className="text-xs">API Access</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card> */}
          </div>
        </div>
      )}
    </>
  );
}

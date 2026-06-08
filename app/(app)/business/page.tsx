"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle,
  Edit,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { getBusiness, getUserById } from "@/services/services";
import moment from "moment";
import Loading from "@/components/shared/loading";

export default function Business() {
  const [loading, setLoading] = useState(true);
  const [business, setBusiness] = useState<any>(null);

  const fetchBusiness = async () => {
    try {
      const res = await getBusiness({});
      if (res.data.status) {
        setBusiness(res.data.response?.[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Business</h1>
            </div>
            <Link href="/profile/edit">
              <Button size="sm" className="w-full sm:w-auto">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            {/* Business Information Card - Third */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building className="h-5 w-5" />
                  Business Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase text-muted-foreground">
                      Business Name
                    </Label>
                    <div className="rounded-lg bg-muted/50 p-2">
                      <p className="text-sm font-medium">
                        {business?.business_name || "Not set"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium uppercase text-muted-foreground">
                      Business Type
                    </Label>
                    <div className="rounded-lg bg-muted/50 p-2">
                      <p className="text-sm capitalize">
                        {business?.business_type || "Not set"}
                      </p>
                    </div>
                  </div>

                  {business?.address && (
                    <div className="space-y-2 sm:col-span-2">
                      <Label className="text-xs font-medium uppercase text-muted-foreground">
                        Address
                      </Label>
                      <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-2">
                        <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{business.address}</p>
                      </div>
                    </div>
                  )}

                  {business?.business_email && (
                    <div className="space-y-2">
                      <Label className="text-xs font-medium uppercase text-muted-foreground">
                        Business Email
                      </Label>
                      <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{business.business_email}</p>
                      </div>
                    </div>
                  )}

                  {business?.business_phone && (
                    <div className="space-y-2">
                      <Label className="text-xs font-medium uppercase text-muted-foreground">
                        Business Phone
                      </Label>
                      <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{business.business_phone}</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Subscription Plan Card */}
            <Card>
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

                {/* Pro Plan Benefits */}
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
            </Card>
          </div>
        </div>
      )}
    </>
  );
}

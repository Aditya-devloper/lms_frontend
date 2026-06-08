"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Phone,
  Calendar,
  TrendingUp,
  Users,
  PhoneCall,
  Edit,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardData } from "@/services/services";
import { toast } from "sonner";
import Loading from "@/components/shared/loading";
import moment from "moment";
import { useRouter } from "next/navigation";

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  contacted: "bg-yellow-100 text-yellow-700 border-yellow-200",
  interested: "bg-purple-100 text-purple-700 border-purple-200",
  "proposal-sent": "bg-indigo-100 text-indigo-700 border-indigo-200",
  converted: "bg-green-100 text-green-700 border-green-200",
  lost: "bg-red-100 text-red-700 border-red-200",
};

const getStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    new: "New",
    contacted: "Contacted",
    interested: "Interested",
    "proposal-sent": "Proposal Sent",
    converted: "Converted",
    lost: "Lost",
  };
  return labels[status] || status;
};

export default function DashboardPage() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<any>({
    totalLeads: 0,
    leadsByStatus: [],
    todayFollowUps: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await getDashboardData({});
      if (res.data.status) {
        setDashboardData(res.data.response);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Can't fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Calculate statistics from real data
  const getNewLeadsCount = () => {
    const newLead = dashboardData.leadsByStatus?.find(
      (item: any) => item._id === "new",
    );
    return newLead?.count || 0;
  };

  const getConvertedLeadsCount = () => {
    const convertedLead = dashboardData.leadsByStatus?.find(
      (item: any) => item._id === "converted",
    );
    return convertedLead?.count || 0;
  };

  const stats = [
    {
      label: "Total Leads",
      value: dashboardData.totalLeads || 0,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "New Leads",
      value: getNewLeadsCount(),
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Follow-ups Today",
      value: dashboardData.todayFollowUps?.length || 0,
      icon: Calendar,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Converted Leads",
      value: getConvertedLeadsCount(),
      icon: PhoneCall,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  const handlePhoneClick = (phone: string) => {
    if (phone && phone !== "") {
      window.location.href = `tel:${phone}`;
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.label} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </span>
                    <div className={`rounded-lg p-2 ${stat.color}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Today's Follow-ups Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Today's Follow-ups</h2>
                <p className="text-xs text-muted-foreground">
                  Leads that need attention today
                </p>
              </div>
              {dashboardData.todayFollowUps?.length > 0 && (
                <Badge variant="secondary" className="px-3 py-1">
                  {dashboardData.todayFollowUps.length} Follow-ups
                </Badge>
              )}
            </div>

            {dashboardData.todayFollowUps?.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    No follow-ups scheduled for today
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check back later for upcoming follow-ups
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="py-0">
                <div className="divide-y">
                  {dashboardData.todayFollowUps.map((lead: any) => (
                    <div
                      key={lead._id}
                      className="flex flex-col gap-3 px-4 py-4 hover:bg-muted/50 transition-colors sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {lead.name || "Unnamed Lead"}
                          </h3>
                          <Badge className={statusColors[lead.status] || ""}>
                            {getStatusLabel(lead.status)}
                          </Badge>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          {lead.email && <span>{lead.email}</span>}
                          {lead.phone && (
                            <button
                              onClick={() => handlePhoneClick(lead.phone)}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                            >
                              <Phone className="h-3 w-3" />
                              {lead.phone}
                            </button>
                          )}
                          {!lead.phone && lead.email && <span>No phone</span>}
                          {!lead.email && !lead.phone && (
                            <span>No contact info</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {moment(lead.follow_up_date).format("MMM D, YYYY")}
                        </div>
                        {lead.phone && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePhoneClick(lead.phone)}
                            className="gap-1"
                          >
                            <Phone className="h-3 w-3" />
                            <span className="hidden sm:inline">Call</span>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => router.push(`/leads/${lead._id}`)}
                          className="gap-1"
                        >
                          <Eye className="h-3 w-3" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      )}
    </>
  );
}

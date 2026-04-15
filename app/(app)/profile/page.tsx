import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Building,
  Phone,
  Mail,
  Calendar,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";

// Mock user data - in real app, this would come from API
const userProfile = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  businessName: "Tech Solutions Inc.",
  businessType: "Software Development",
  plan: "Pro Plan",
  planExpiry: "2026-12-31",
  joinDate: "2025-01-15",
  totalAgents: 5,
  activeLeads: 120,
};

export default function ProfilePage() {
  return (
    <div className="">
      <div className="flex justify-between items-center  mb-4">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <Link href="/profile/edit">
          <Button size={"sm"}>Edit Profile</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Statistics */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Account Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {userProfile.totalAgents}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  Total Agents
                </div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {userProfile.activeLeads}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  Active Leads
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {userProfile.plan}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  Current Plan
                </div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {Math.floor(
                    (new Date(userProfile.planExpiry).getTime() -
                      new Date().getTime()) /
                      (1000 * 60 * 60 * 24),
                  )}
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  Days Left
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-muted-foreground mb-2">Full Name</Label>
                <p className="text-md">{userProfile.name}</p>
              </div>
              <div>
                <Label className="text-muted-foreground mb-2">Email</Label>
                <p className="text-md flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {userProfile.email}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground mb-2">Phone</Label>
                <p className="text-md flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {userProfile.phone}
                </p>
              </div>
              <div>
                <Label className="text-muted-foreground mb-2">Join Date</Label>
                <p className="text-md flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(userProfile.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Business Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-muted-foreground mb-2">
                Business Name
              </Label>
              <p className="text-md">{userProfile.businessName}</p>
            </div>
            <div>
              <Label className="text-muted-foreground mb-2">
                Business Type
              </Label>
              <p className="text-md">{userProfile.businessType}</p>
            </div>
            <div>
              <Label className="text-muted-foreground mb-2">Current Plan</Label>
              <Badge variant="secondary" className="text-md px-3 py-1">
                {userProfile.plan}
              </Badge>
            </div>
            <div>
              <Label className="text-muted-foreground mb-2">Plan Expiry</Label>
              <p className="text-md flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                {new Date(userProfile.planExpiry).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

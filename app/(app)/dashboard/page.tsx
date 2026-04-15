import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { label: "Total Leads", value: 120 },
  { label: "New Leads", value: 8 },
  { label: "Follow-ups Today", value: 5 },
  { label: "Converted Leads", value: 32 },
];

const followups = [
  {
    name: "Amit Sharma",
    phone: "9876543210",
    status: "Contacted",
    date: "2026-02-01",
  },
  {
    name: "Priya Singh",
    phone: "9123456789",
    status: "New",
    date: "2026-02-01",
  },
  {
    name: "Rahul Verma",
    phone: "9988776655",
    status: "Interested",
    date: "2026-02-01",
  },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Interested: "bg-purple-100 text-purple-700",
  Converted: "bg-green-100 text-green-700",
  Lost: "bg-red-100 text-red-700",
};

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="text-sm text-muted-foreground">
              {stat.label}
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {stat.value}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-5">
        <h2 className="text-lg font-semibold mb-4">Today's Follow-ups</h2>
        <div className="bg-white rounded-lg shadow-sm divide-y">
          {followups.map((lead, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-4 py-3"
            >
              <div>
                <div className="font-medium">{lead.name}</div>
                <div className="text-sm text-muted-foreground">
                  {lead.phone}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className={statusColors[lead.status] || ""}>
                  {lead.status}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {lead.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

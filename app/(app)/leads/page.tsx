import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const leads = [
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
    date: "2026-02-02",
  },
  {
    name: "Rahul Verma",
    phone: "9988776655",
    status: "Interested",
    date: "2026-02-03",
  },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700",
  Contacted: "bg-yellow-100 text-yellow-700",
  Interested: "bg-purple-100 text-purple-700",
  Converted: "bg-green-100 text-green-700",
  Lost: "bg-red-100 text-red-700",
};

export default function LeadsPage() {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Leads</h1>
          <Link href="/leads/create" className="block sm:hidden">
            <Button size={"sm"}>Create Lead</Button>
          </Link>
        </div>
        <div className="flex gap-3 items-center">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Contacted">Contacted</SelectItem>
              <SelectItem value="Interested">Interested</SelectItem>
              <SelectItem value="Converted">Converted</SelectItem>
              <SelectItem value="Lost">Lost</SelectItem>
            </SelectContent>
          </Select>
          <Input
            className="w-full sm:w-64"
            placeholder="Search by name or phone"
          />
          <Link href="/leads/create" className="hidden sm:block">
            <Button size={"sm"}>Create Lead</Button>
          </Link>
        </div>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Follow-up Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {leads.map((lead, idx) => (
                <TableRow key={idx}>
                  <TableCell>{lead.name}</TableCell>

                  <TableCell>{lead.phone}</TableCell>

                  <TableCell>
                    <Badge className={statusColors[lead.status] || ""}>
                      {lead.status}
                    </Badge>
                  </TableCell>

                  <TableCell>{lead.date}</TableCell>

                  <TableCell className="flex gap-2">
                    <Link
                      href={`/leads/${idx}`}
                      className="text-primary underline"
                    >
                      View
                    </Link>
                    <Link
                      href={`/leads/${idx}/edit`}
                      className="text-muted-foreground underline"
                    >
                      Edit
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

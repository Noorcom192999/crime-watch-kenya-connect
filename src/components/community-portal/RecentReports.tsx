
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

const RecentReports = () => {
  const recentReports = [
    { 
      id: "CR/2024/001", 
      type: "Theft", 
      location: "Westlands", 
      status: "Under Investigation",
      time: "2 hours ago"
    },
    { 
      id: "CR/2024/002", 
      type: "Noise Complaint", 
      location: "Karen", 
      status: "Resolved",
      time: "1 day ago"
    },
    { 
      id: "CR/2024/003", 
      type: "Suspicious Activity", 
      location: "CBD", 
      status: "Assigned",
      time: "3 hours ago"
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Recent Reports
        </CardTitle>
        <CardDescription>Community activity (anonymized)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentReports.map((report, index) => (
          <div key={index} className="p-3 border rounded-lg text-sm">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">{report.type}</span>
              <Badge
                variant="secondary"
                className={
                  report.status === "Resolved"
                    ? "bg-green-100 text-green-800"
                    : report.status === "Under Investigation"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-blue-100 text-blue-800"
                }
              >
                {report.status}
              </Badge>
            </div>
            <p className="text-gray-600">{report.location}</p>
            <p className="text-xs text-gray-500">{report.time}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentReports;

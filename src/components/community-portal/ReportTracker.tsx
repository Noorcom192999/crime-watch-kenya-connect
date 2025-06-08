
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search, CheckCircle, Clock, MapPin, User, Phone } from "lucide-react";
import { useCrimeReports } from "@/hooks/useCrimeReports";
import { toast } from "@/hooks/use-toast";

const ReportTracker = () => {
  const [reportId, setReportId] = useState("");
  const [reportData, setReportData] = useState<any>(null);
  const { trackReport, loading } = useCrimeReports();

  const handleTrackReport = async () => {
    if (!reportId.trim()) {
      toast({
        title: "Missing Report ID",
        description: "Please enter a valid report ID.",
        variant: "destructive",
      });
      return;
    }

    const result = await trackReport(reportId.trim());
    
    if (result.success) {
      setReportData(result.data);
      toast({
        title: "Report Found",
        description: "Report details loaded successfully.",
      });
    } else {
      setReportData(null);
      toast({
        title: "Report Not Found",
        description: "No report found with the provided ID.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "assigned": return "bg-yellow-100 text-yellow-800";
      case "under_investigation": return "bg-orange-100 text-orange-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Your Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input 
            placeholder="Enter report ID (e.g., CR/2024/001)" 
            value={reportId}
            onChange={(e) => setReportId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleTrackReport()}
          />
          <Button size="sm" onClick={handleTrackReport} disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Search className="h-4 w-4 mr-1" />
                Track
              </>
            )}
          </Button>
        </div>
        
        {!reportData && (
          <p className="text-xs text-gray-500">
            Use your report ID to check the status and updates
          </p>
        )}

        {reportData && (
          <div className="mt-6 space-y-4">
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="font-semibold text-lg">{reportData.report_id}</h3>
                <Badge className={getStatusColor(reportData.status)}>
                  {formatStatus(reportData.status)}
                </Badge>
                <Badge className={getPriorityColor(reportData.priority)}>
                  {reportData.priority} Priority
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Type:</span>
                  <span className="capitalize">{reportData.incident_type}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Submitted:</span>
                  <span>{new Date(reportData.created_at).toLocaleDateString()}</span>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <span className="font-medium">Location:</span>
                  <span className="flex-1">{reportData.location_address}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium">Urgency:</span>
                  <span className="capitalize">{reportData.urgency_level}</span>
                </div>
              </div>

              {reportData.police_stations && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Assigned Station</h4>
                  <div className="text-sm space-y-1">
                    <p className="font-medium">{reportData.police_stations.name}</p>
                    <p className="text-blue-700">{reportData.police_stations.address}</p>
                    {reportData.police_stations.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        <span>{reportData.police_stations.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {reportData.officers && (
                <div className="bg-green-50 p-3 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">Investigating Officer</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-green-600" />
                    <span>{reportData.officers.rank} {reportData.officers.first_name} {reportData.officers.last_name}</span>
                  </div>
                </div>
              )}

              <div className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                <p className="text-sm text-gray-700">{reportData.description}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReportTracker;


import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";
import { CaseFile } from "@/hooks/useEvidence";

interface CaseFileCardProps {
  caseFile: CaseFile;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "bg-green-100 text-green-800";
    case "Under Review": return "bg-yellow-100 text-yellow-800";
    case "Closed": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "bg-red-100 text-red-800";
    case "Medium": return "bg-yellow-100 text-yellow-800";
    case "Low": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const CaseFileCard = ({ caseFile }: CaseFileCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg">{caseFile.title}</h3>
              <Badge className={getStatusColor(caseFile.status)}>
                {caseFile.status}
              </Badge>
              <Badge className={getPriorityColor(caseFile.priority)}>
                {caseFile.priority} Priority
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Case ID:</span>
                <p>{caseFile.case_id}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Lead Officer:</span>
                <p>{caseFile.lead_officer}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Evidence Items:</span>
                <p>{caseFile.evidence_count} items</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Last Updated:</span>
                <p>{caseFile.last_updated}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-1" />
              Open Case
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-1" />
              Add Evidence
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseFileCard;

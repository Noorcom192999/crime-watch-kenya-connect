
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Lock, Shield } from "lucide-react";
import { EvidenceItem } from "@/hooks/useEvidence";

interface EvidenceItemCardProps {
  item: EvidenceItem;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Secured": return "bg-green-100 text-green-800";
    case "Under Analysis": return "bg-yellow-100 text-yellow-800";
    case "Processed": return "bg-blue-100 text-blue-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const EvidenceItemCard = ({ item }: EvidenceItemCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg">{item.evidence_id}</h3>
              <Badge className={getStatusColor(item.status)}>
                {item.status}
              </Badge>
              <Badge variant="outline">
                Case: {item.case_id}
              </Badge>
              <Badge className="bg-green-100 text-green-800">
                <Shield className="h-3 w-3 mr-1" />
                {item.integrity_status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Type:</span>
                <p>{item.type}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Location:</span>
                <p>{item.location}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Collected By:</span>
                <p>{item.collected_by}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Date Collected:</span>
                <p>{item.date_collected}</p>
              </div>
              <div className="md:col-span-2">
                <span className="font-medium text-gray-600">Description:</span>
                <p>{item.description}</p>
              </div>
            </div>

            {item.blockchain_hash && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center gap-2 text-sm">
                  <Lock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Blockchain Hash:</span>
                  <code className="text-xs bg-white px-2 py-1 rounded">{item.blockchain_hash}</code>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EvidenceItemCard;

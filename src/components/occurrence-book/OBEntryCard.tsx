import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Clock, MapPin, User } from "lucide-react";
import { OccurrenceBookEntry } from "@/hooks/useOccurrenceBook";
import { LEVEL_LABELS, LEVEL_COLORS, CATEGORY_LABELS } from "@/utils/reportLevels";

interface OBEntryCardProps {
  entry: OccurrenceBookEntry;
  onStatusUpdate: (id: string, status: string) => void;
}

const OBEntryCard = ({ entry, onStatusUpdate }: OBEntryCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "under_investigation": return "bg-yellow-100 text-yellow-800";
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

  const getLevelColor = (level: string) => LEVEL_COLORS[level] || "bg-gray-100 text-gray-800";

  const formatStatus = (status: string) => {
    return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="font-semibold text-lg">{entry.ob_number}</h3>
              <Badge className={getStatusColor(entry.status || 'new')}>
                {formatStatus(entry.status || 'new')}
              </Badge>
              <Badge className={getPriorityColor(entry.priority_level)}>
                {entry.priority_level} Priority
              </Badge>
              {entry.info_level && (
                <Badge className={getLevelColor(entry.info_level)}>
                  {LEVEL_LABELS[entry.info_level]}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Type:</span>
                <span>{entry.incident_type}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Location:</span>
                <span>{entry.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Time:</span>
                <span>{new Date(entry.incident_datetime).toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Officer:</span>
                <span>{entry.officers ? `${entry.officers.first_name} ${entry.officers.last_name}` : 'Unassigned'}</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">View Details</Button>
            <Select onValueChange={(value) => onStatusUpdate(entry.id!, value)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="under_investigation">Under Investigation</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OBEntryCard;

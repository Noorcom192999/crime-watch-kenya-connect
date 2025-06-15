
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Edit } from "lucide-react";
import { PoliceRank } from "@/utils/policeRanks";

interface Officer {
  id: string;
  badge_number: string;
  full_name: string;
  rank: PoliceRank;
  station_id: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended';
  date_joined: string;
  created_at: string;
  station?: {
    name: string;
    county: string;
  };
}

interface OfficersListProps {
  officers: Officer[];
  onEdit: (officer: Officer) => void;
}

export const OfficersList = ({ officers, onEdit }: OfficersListProps) => {
  if (officers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No officers found matching your search criteria.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {officers.map((officer) => (
        <div key={officer.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold">{officer.full_name}</h4>
                <p className="text-sm text-gray-600">
                  {officer.rank} • Badge: {officer.badge_number}
                </p>
                <p className="text-sm text-gray-500">
                  {officer.station?.name}, {officer.station?.county}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant={officer.status === 'active' ? 'default' : 
                        officer.status === 'suspended' ? 'destructive' : 'secondary'}
              >
                {officer.status}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(officer)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

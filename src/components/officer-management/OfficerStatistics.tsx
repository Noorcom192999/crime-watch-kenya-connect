
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, Shield, Star } from "lucide-react";
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

interface OfficerStatisticsProps {
  officers: Officer[];
}

export const OfficerStatistics = ({ officers }: OfficerStatisticsProps) => {
  const activeOfficers = officers.filter(o => o.status === 'active').length;
  const stationsCovered = new Set(officers.map(o => o.station_id)).size;
  const seniorOfficers = officers.filter(o => 
    ['Inspector-General of Police', 'Deputy Inspector-General', 'Senior Assistant Inspector-General', 'Assistant Inspector-General'].includes(o.rank)
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Officers</p>
              <p className="text-2xl font-bold">{officers.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Officers</p>
              <p className="text-2xl font-bold text-green-600">{activeOfficers}</p>
            </div>
            <UserCheck className="h-8 w-8 text-green-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Stations Covered</p>
              <p className="text-2xl font-bold">{stationsCovered}</p>
            </div>
            <Shield className="h-8 w-8 text-purple-500" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Senior Officers</p>
              <p className="text-2xl font-bold">{seniorOfficers}</p>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

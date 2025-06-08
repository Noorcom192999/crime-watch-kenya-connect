
import { Badge } from "@/components/ui/badge";
import { Shield, Clock } from "lucide-react";

const CommunityPortalHeader = () => {
  return (
    <div className="text-center space-y-4 mb-8">
      <h2 className="text-2xl font-bold">Community Crime Reporting Portal</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Report crimes and incidents directly to your nearest police station. Your reports help keep our communities safe.
      </p>
      <div className="flex items-center justify-center gap-2">
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          <Shield className="h-4 w-4 mr-1" />
          Secure & Confidential
        </Badge>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          <Clock className="h-4 w-4 mr-1" />
          24/7 Available
        </Badge>
      </div>
    </div>
  );
};

export default CommunityPortalHeader;

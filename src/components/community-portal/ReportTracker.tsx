
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ReportTracker = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Track Your Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input placeholder="Enter report ID (e.g., CR/2024/001)" />
          <Button size="sm">Track</Button>
        </div>
        <p className="text-xs text-gray-500">
          Use your report ID to check the status and updates
        </p>
      </CardContent>
    </Card>
  );
};

export default ReportTracker;

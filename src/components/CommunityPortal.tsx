
import { useState } from "react";
import CommunityPortalHeader from "./community-portal/CommunityPortalHeader";
import ReportForm from "./community-portal/ReportForm";
import EmergencyContacts from "./community-portal/EmergencyContacts";
import ReportTracker from "./community-portal/ReportTracker";
import RecentReports from "./community-portal/RecentReports";

const CommunityPortal = () => {
  const [reportType, setReportType] = useState("incident");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [location, setLocation] = useState("");
  const [nearestStation, setNearestStation] = useState("");

  return (
    <div className="space-y-6">
      <CommunityPortalHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ReportForm
            reportType={reportType}
            setReportType={setReportType}
            isAnonymous={isAnonymous}
            setIsAnonymous={setIsAnonymous}
            location={location}
            setLocation={setLocation}
            nearestStation={nearestStation}
            setNearestStation={setNearestStation}
          />
        </div>

        <div className="space-y-6">
          <EmergencyContacts />
          <ReportTracker />
          <RecentReports />
        </div>
      </div>
    </div>
  );
};

export default CommunityPortal;


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Shield, Clock, FileText, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CommunityPortal = () => {
  const [reportType, setReportType] = useState("incident");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [location, setLocation] = useState("");
  const [nearestStation, setNearestStation] = useState("");

  const emergencyContacts = [
    { service: "Police Emergency", number: "999", available: "24/7" },
    { service: "Police Hotline", number: "0800 123 456", available: "24/7" },
    { service: "Crime Stoppers", number: "0800 654 321", available: "24/7" },
    { service: "Gender-Based Violence", number: "1195", available: "24/7" },
  ];

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

  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Simulate finding nearest station based on coordinates
          setLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
          setNearestStation("Westlands Police Station - 1.2km away");
          toast({
            title: "Location Detected",
            description: "Your nearest police station has been identified.",
          });
        },
        (error) => {
          toast({
            title: "Location Error", 
            description: "Unable to detect location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSubmitReport = () => {
    const reportId = `CR/2024/${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    toast({
      title: "Report Submitted Successfully",
      description: `Your report ID is ${reportId}. You will receive SMS updates.`,
    });
  };

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Reporting Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit a Report</CardTitle>
              <CardDescription>
                Choose the type of report and provide details about the incident
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Report Type Selection */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant={reportType === "incident" ? "default" : "outline"}
                  onClick={() => setReportType("incident")}
                  className="h-20 flex flex-col gap-2"
                >
                  <AlertTriangle className="h-6 w-6" />
                  Report Incident
                </Button>
                <Button
                  variant={reportType === "tip" ? "default" : "outline"}
                  onClick={() => setReportType("tip")}
                  className="h-20 flex flex-col gap-2"
                >
                  <FileText className="h-6 w-6" />
                  Submit Tip
                </Button>
              </div>

              {/* Incident Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incident-type">Type of {reportType === "incident" ? "Incident" : "Information"}</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="theft">Theft</SelectItem>
                        <SelectItem value="assault">Assault</SelectItem>
                        <SelectItem value="burglary">Burglary</SelectItem>
                        <SelectItem value="robbery">Robbery</SelectItem>
                        <SelectItem value="fraud">Fraud</SelectItem>
                        <SelectItem value="vandalism">Vandalism</SelectItem>
                        <SelectItem value="domestic-violence">Domestic Violence</SelectItem>
                        <SelectItem value="drug-activity">Drug Activity</SelectItem>
                        <SelectItem value="suspicious-activity">Suspicious Activity</SelectItem>
                        <SelectItem value="noise-complaint">Noise Complaint</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency (Ongoing)</SelectItem>
                        <SelectItem value="urgent">Urgent (Within 24hrs)</SelectItem>
                        <SelectItem value="routine">Routine (General Report)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location Input */}
                <div className="space-y-2">
                  <Label htmlFor="location">Location of Incident</Label>
                  <div className="flex gap-2">
                    <Input
                      id="location"
                      placeholder="Enter address or describe location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" onClick={handleLocationDetection}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Detect
                    </Button>
                  </div>
                  {nearestStation && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" />
                      {nearestStation}
                    </p>
                  )}
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incident-date">Date of Incident</Label>
                    <Input id="incident-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="incident-time">Time of Incident</Label>
                    <Input id="incident-time" type="time" />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed description of what happened. Include any relevant details about suspects, vehicles, or evidence."
                    rows={4}
                  />
                </div>

                {/* Contact Information (if not anonymous) */}
                {!isAnonymous && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reporter-name">Your Name</Label>
                      <Input id="reporter-name" placeholder="Enter your full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reporter-contact">Contact Information</Label>
                      <Input id="reporter-contact" placeholder="Phone number or email" />
                    </div>
                  </div>
                )}

                {/* Anonymous Reporting */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="anonymous"
                    checked={isAnonymous}
                    onCheckedChange={setIsAnonymous}
                  />
                  <Label htmlFor="anonymous" className="text-sm">
                    Submit anonymously (your identity will not be recorded)
                  </Label>
                </div>

                {/* Submit Button */}
                <Button onClick={handleSubmitReport} className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Submit Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{contact.service}</p>
                      <p className="text-lg font-bold text-blue-600">{contact.number}</p>
                      <p className="text-xs text-gray-500">{contact.available}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Track Your Report */}
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

          {/* Recent Community Reports */}
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
        </div>
      </div>
    </div>
  );
};

export default CommunityPortal;

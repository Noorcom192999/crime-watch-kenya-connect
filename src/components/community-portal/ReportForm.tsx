
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, FileText, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ReportFormProps {
  reportType: string;
  setReportType: (type: string) => void;
  isAnonymous: boolean;
  setIsAnonymous: (anonymous: boolean) => void;
  location: string;
  setLocation: (location: string) => void;
  nearestStation: string;
  setNearestStation: (station: string) => void;
}

const ReportForm = ({
  reportType,
  setReportType,
  isAnonymous,
  setIsAnonymous,
  location,
  setLocation,
  nearestStation,
  setNearestStation,
}: ReportFormProps) => {
  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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

  const handleAnonymousChange = (checked: boolean | "indeterminate") => {
    setIsAnonymous(checked === true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a Report</CardTitle>
        <CardDescription>
          Choose the type of report and provide details about the incident
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide detailed description of what happened. Include any relevant details about suspects, vehicles, or evidence."
              rows={4}
            />
          </div>

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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={handleAnonymousChange}
            />
            <Label htmlFor="anonymous" className="text-sm">
              Submit anonymously (your identity will not be recorded)
            </Label>
          </div>

          <Button onClick={handleSubmitReport} className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Submit Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportForm;

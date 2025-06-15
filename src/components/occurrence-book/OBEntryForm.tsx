import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";
import { LEVEL_LABELS, CATEGORY_LABELS } from "@/utils/reportLevels";

interface OBEntryFormProps {
  onSubmit: (formData: any) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

const OBEntryForm = ({ onSubmit, onCancel, loading }: OBEntryFormProps) => {
  const [formData, setFormData] = useState({
    incident_type: "",
    priority_level: "medium" as "low" | "medium" | "high",
    location: "",
    incident_datetime: "",
    complainant_name: "",
    complainant_contact: "",
    description: "",
    evidence_collected: "",
    witnesses_info: "",
    info_level: "R" as "Z" | "O" | "P" | "R"
  });

  const handleSubmit = async () => {
    if (!formData.incident_type || !formData.location || !formData.description || !formData.incident_datetime) {
      return;
    }
    await onSubmit(formData);
  };

  const handleEvidenceChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const witnessIndex = text.indexOf('\n\nWitnesses:\n');
    if (witnessIndex > -1) {
      setFormData({
        ...formData, 
        evidence_collected: text.substring(0, witnessIndex),
        witnesses_info: text.substring(witnessIndex + 13)
      });
    } else {
      setFormData({...formData, evidence_collected: text, witnesses_info: ""});
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New OB Entry</CardTitle>
        <CardDescription>Fill in the details for the new occurrence book entry</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="incident-type">Incident Type</Label>
            <Select value={formData.incident_type} onValueChange={(value) => setFormData({...formData, incident_type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select incident type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="theft">Theft</SelectItem>
                <SelectItem value="assault">Assault</SelectItem>
                <SelectItem value="burglary">Burglary</SelectItem>
                <SelectItem value="robbery">Robbery</SelectItem>
                <SelectItem value="fraud">Fraud</SelectItem>
                <SelectItem value="vandalism">Vandalism</SelectItem>
                <SelectItem value="domestic-violence">Domestic Violence</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select value={formData.priority_level} onValueChange={(value: "low" | "medium" | "high") => setFormData({...formData, priority_level: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              placeholder="Enter incident location" 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date-time">Date & Time</Label>
            <Input 
              id="date-time" 
              type="datetime-local" 
              value={formData.incident_datetime}
              onChange={(e) => setFormData({...formData, incident_datetime: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="complainant">Complainant Name</Label>
            <Input 
              id="complainant" 
              placeholder="Enter complainant name" 
              value={formData.complainant_name}
              onChange={(e) => setFormData({...formData, complainant_name: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Information</Label>
            <Input 
              id="contact" 
              placeholder="Phone number or email" 
              value={formData.complainant_contact}
              onChange={(e) => setFormData({...formData, complainant_contact: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="info-level">Information Level</Label>
            <Select value={formData.info_level} onValueChange={value => setFormData({ ...formData, info_level: value as any })}>
              <SelectTrigger>
                <SelectValue placeholder="Select level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Z">High Risks (Z)</SelectItem>
                <SelectItem value="O">High Priority (O)</SelectItem>
                <SelectItem value="P">Priority (P)</SelectItem>
                <SelectItem value="R">Routine (R)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Incident Description</Label>
          <Textarea 
            id="description" 
            placeholder="Provide detailed description of the incident"
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="evidence">Evidence & Witnesses</Label>
          <Textarea 
            id="evidence" 
            placeholder="List any evidence collected and witness information"
            rows={3}
            value={formData.evidence_collected + (formData.witnesses_info ? '\n\nWitnesses:\n' + formData.witnesses_info : '')}
            onChange={handleEvidenceChange}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={handleSubmit} className="flex-1" disabled={loading}>
            <FileText className="h-4 w-4 mr-2" />
            {loading ? "Creating..." : "Create OB Entry"}
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OBEntryForm;

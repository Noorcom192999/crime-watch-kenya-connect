
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEvidence } from "@/hooks/useEvidence";

interface AddEvidenceFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const AddEvidenceForm = ({ onSuccess, onCancel }: AddEvidenceFormProps) => {
  const { addEvidenceItem, loading } = useEvidence();
  const [formData, setFormData] = useState({
    case_id: '',
    type: '',
    description: '',
    location: '',
    collected_by: '',
    date_collected: '',
    status: 'Secured'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addEvidenceItem(formData);
    if (result.success) {
      setFormData({
        case_id: '',
        type: '',
        description: '',
        location: '',
        collected_by: '',
        date_collected: '',
        status: 'Secured'
      });
      onSuccess?.();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Evidence Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="case_id">Case ID</Label>
              <Input
                id="case_id"
                value={formData.case_id}
                onChange={(e) => handleInputChange('case_id', e.target.value)}
                placeholder="e.g., OB/001/2024"
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Evidence Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select evidence type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Physical Evidence">Physical Evidence</SelectItem>
                  <SelectItem value="Digital Evidence">Digital Evidence</SelectItem>
                  <SelectItem value="Document">Document</SelectItem>
                  <SelectItem value="Forensic Sample">Forensic Sample</SelectItem>
                  <SelectItem value="Photograph">Photograph</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Detailed description of the evidence item"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Storage Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Evidence Locker A-12"
                required
              />
            </div>
            <div>
              <Label htmlFor="collected_by">Collected By</Label>
              <Input
                id="collected_by"
                value={formData.collected_by}
                onChange={(e) => handleInputChange('collected_by', e.target.value)}
                placeholder="Officer name and badge number"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date_collected">Date Collected</Label>
              <Input
                id="date_collected"
                type="date"
                value={formData.date_collected}
                onChange={(e) => handleInputChange('date_collected', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Secured">Secured</SelectItem>
                  <SelectItem value="Under Analysis">Under Analysis</SelectItem>
                  <SelectItem value="Processed">Processed</SelectItem>
                  <SelectItem value="Released">Released</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Evidence'}
            </Button>
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddEvidenceForm;

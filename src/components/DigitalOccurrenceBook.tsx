
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useOccurrenceBook, type OccurrenceBookEntry } from "@/hooks/useOccurrenceBook";
import { usePoliceStations } from "@/hooks/usePoliceStations";
import OBEntryForm from "./occurrence-book/OBEntryForm";
import OBSearchFilter from "./occurrence-book/OBSearchFilter";
import OBEntriesList from "./occurrence-book/OBEntriesList";

const DigitalOccurrenceBook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewReport, setShowNewReport] = useState(false);
  const [entries, setEntries] = useState<OccurrenceBookEntry[]>([]);

  const { loading, createEntry, fetchEntries, updateEntryStatus } = useOccurrenceBook();
  const { stations } = usePoliceStations();

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const result = await fetchEntries();
    if (result.success && result.data) {
      setEntries(result.data);
    }
  };

  const handleNewReport = async (formData: any) => {
    // For demo purposes, using the first station and a mock officer ID
    const stationId = stations[0]?.id;
    const mockOfficerId = "mock-officer-id"; // In real app, this would come from authentication

    if (!stationId) {
      return;
    }

    const result = await createEntry({
      ...formData,
      station_id: stationId,
      created_by_officer_id: mockOfficerId
    });

    if (result.success) {
      setShowNewReport(false);
      loadEntries();
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    const result = await updateEntryStatus(id, newStatus);
    if (result.success) {
      loadEntries();
    }
  };

  const filteredEntries = entries.filter(entry =>
    entry.ob_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.incident_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.officers?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.officers?.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (showNewReport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">New Occurrence Book Entry</h2>
          <Button variant="outline" onClick={() => setShowNewReport(false)}>
            Back to OB List
          </Button>
        </div>

        <OBEntryForm 
          onSubmit={handleNewReport}
          onCancel={() => setShowNewReport(false)}
          loading={loading}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Digital Occurrence Book</h2>
        <Button onClick={() => setShowNewReport(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New OB Entry
        </Button>
      </div>

      <OBSearchFilter 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <OBEntriesList 
        entries={filteredEntries}
        loading={loading}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default DigitalOccurrenceBook;


import { Card, CardContent } from "@/components/ui/card";
import { OccurrenceBookEntry } from "@/hooks/useOccurrenceBook";
import OBEntryCard from "./OBEntryCard";

interface OBEntriesListProps {
  entries: OccurrenceBookEntry[];
  loading: boolean;
  onStatusUpdate: (id: string, status: string) => void;
}

const OBEntriesList = ({ entries, loading, onStatusUpdate }: OBEntriesListProps) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">Loading OB entries...</p>
        </CardContent>
      </Card>
    );
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-muted-foreground">No OB entries found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <OBEntryCard 
          key={entry.id} 
          entry={entry} 
          onStatusUpdate={onStatusUpdate}
        />
      ))}
    </div>
  );
};

export default OBEntriesList;


import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { KENYA_POLICE_RANKS } from "@/utils/policeRanks";

interface OfficerFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterRank: string;
  onRankFilterChange: (value: string) => void;
  filterStatus: string;
  onStatusFilterChange: (value: string) => void;
}

export const OfficerFilters = ({
  searchTerm,
  onSearchChange,
  filterRank,
  onRankFilterChange,
  filterStatus,
  onStatusFilterChange
}: OfficerFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name or badge number..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Select value={filterRank} onValueChange={onRankFilterChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by rank" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Ranks</SelectItem>
          {KENYA_POLICE_RANKS.map((rank) => (
            <SelectItem key={rank} value={rank}>
              {rank}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={filterStatus} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

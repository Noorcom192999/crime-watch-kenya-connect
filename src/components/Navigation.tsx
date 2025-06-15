
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  FileText, 
  BarChart3, 
  Users, 
  Database, 
  Share2, 
  MapPin, 
  Shield,
  Bell,
  Settings,
  UserCheck
} from "lucide-react";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "occurrence-book", label: "Digital OB", icon: FileText },
    { id: "crime-clock", label: "Crime Clock", icon: Clock },
    { id: "community-portal", label: "Community Portal", icon: Users },
    { id: "crime-register", label: "Crime Register", icon: Database },
    { id: "officer-management", label: "Officers", icon: UserCheck },
    { id: "data-sharing", label: "Data Hub", icon: Share2 },
    { id: "station-locator", label: "Station Locator", icon: MapPin },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">NOORCOM</h2>
              <p className="text-xs text-gray-500">Police Crime Clock System</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className="flex items-center gap-2"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">3</Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-3">
          <div className="flex overflow-x-auto gap-2 pb-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;


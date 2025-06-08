
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Share2, 
  Database, 
  Globe, 
  Shield, 
  Users, 
  Building, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";

const DataSharingHub = () => {
  const connectedStations = [
    {
      name: "Nairobi Central Police Station",
      code: "NRB-001",
      status: "Online",
      lastSync: "2 minutes ago",
      dataShared: 156,
      location: "Nairobi CBD"
    },
    {
      name: "Westlands Police Station", 
      code: "WLD-002",
      status: "Online",
      lastSync: "5 minutes ago", 
      dataShared: 89,
      location: "Westlands"
    },
    {
      name: "Kasarani Police Station",
      code: "KSR-003", 
      status: "Syncing",
      lastSync: "15 minutes ago",
      dataShared: 134,
      location: "Kasarani"
    },
    {
      name: "Karen Police Station",
      code: "KRN-004",
      status: "Offline",
      lastSync: "2 hours ago",
      dataShared: 45,
      location: "Karen"
    }
  ];

  const governmentEntities = [
    {
      name: "Ministry of Interior",
      department: "National Security",
      accessLevel: "Full Access",
      status: "Connected",
      lastAccess: "1 hour ago"
    },
    {
      name: "Directorate of Criminal Investigations (DCI)",
      department: "Criminal Investigations",
      accessLevel: "Investigation Data",
      status: "Connected", 
      lastAccess: "30 minutes ago"
    },
    {
      name: "National Police Service",
      department: "Operations",
      accessLevel: "Operational Data",
      status: "Connected",
      lastAccess: "5 minutes ago"
    },
    {
      name: "County Commissioner's Office",
      department: "Nairobi County",
      accessLevel: "Regional Data",
      status: "Connected",
      lastAccess: "2 hours ago"
    }
  ];

  const dataMetrics = [
    {
      title: "Total Stations Connected",
      value: "156",
      change: "+3 today",
      icon: Building
    },
    {
      title: "Data Records Shared",
      value: "2,847",
      change: "+127 today", 
      icon: Database
    },
    {
      title: "Real-time Sync Status",
      value: "98.5%",
      change: "System healthy",
      icon: Globe
    },
    {
      title: "Security Incidents",
      value: "0",
      change: "All secure",
      icon: Shield
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Online":
      case "Connected":
        return "bg-green-100 text-green-800";
      case "Syncing":
        return "bg-yellow-100 text-yellow-800";
      case "Offline":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Online":
      case "Connected":
        return <CheckCircle className="h-4 w-4" />;
      case "Syncing":
        return <Clock className="h-4 w-4" />;
      case "Offline":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Real-Time Data Sharing Hub</h2>
          <p className="text-gray-600">Secure data exchange across police stations and government entities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button>
            <Shield className="h-4 w-4 mr-2" />
            Security Center
          </Button>
        </div>
      </div>

      {/* Data Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dataMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-green-600">{metric.change}</p>
                </div>
                <metric.icon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sync Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            System-wide Synchronization Status
          </CardTitle>
          <CardDescription>Real-time data sync across the network</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Sync Health</span>
              <span className="text-sm text-green-600">98.5% Operational</span>
            </div>
            <Progress value={98.5} className="w-full" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-lg font-bold text-green-700">142</p>
                <p className="text-sm text-green-600">Stations Online</p>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <p className="text-lg font-bold text-yellow-700">12</p>
                <p className="text-sm text-yellow-600">Syncing</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-lg font-bold text-red-700">2</p>
                <p className="text-sm text-red-600">Offline</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="stations" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="stations">Police Stations</TabsTrigger>
          <TabsTrigger value="government">Government Entities</TabsTrigger>
        </TabsList>

        <TabsContent value="stations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Connected Police Stations
              </CardTitle>
              <CardDescription>Real-time status of all connected police stations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedStations.map((station, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{station.name}</h4>
                        <p className="text-sm text-gray-600">{station.location} • Code: {station.code}</p>
                        <p className="text-xs text-gray-500">Last sync: {station.lastSync}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{station.dataShared} records</p>
                        <p className="text-xs text-gray-500">shared today</p>
                      </div>
                      <Badge className={getStatusColor(station.status)}>
                        {getStatusIcon(station.status)}
                        {station.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        View Data
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="government" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Government Entity Access
              </CardTitle>
              <CardDescription>Connected government departments and their access levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {governmentEntities.map((entity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Users className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{entity.name}</h4>
                        <p className="text-sm text-gray-600">{entity.department}</p>
                        <p className="text-xs text-gray-500">Last access: {entity.lastAccess}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{entity.accessLevel}</p>
                        <p className="text-xs text-gray-500">permission level</p>
                      </div>
                      <Badge className={getStatusColor(entity.status)}>
                        {getStatusIcon(entity.status)}
                        {entity.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4 mr-1" />
                        Manage Access
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Security Notice */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">End-to-End Encryption Active</h3>
              <p className="text-sm text-green-700">
                All data transmissions are encrypted using AES-256 encryption. Access logs are maintained for audit purposes.
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <Shield className="h-3 w-3 mr-1" />
              Secure
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSharingHub;

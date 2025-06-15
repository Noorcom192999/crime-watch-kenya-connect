import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Shield, MapPin, FileText, Users, BarChart3, AlertTriangle, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import DigitalOccurrenceBook from "@/components/DigitalOccurrenceBook";
import CrimeClockModule from "@/components/CrimeClockModule";
import CommunityPortal from "@/components/CommunityPortal";
import CrimeRegister from "@/components/CrimeRegister";
import DataSharingHub from "@/components/DataSharingHub";
import StationLocator from "@/components/StationLocator";
import OfficerManagement from "@/components/OfficerManagement";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const statsData = [
    { title: "Active Cases", value: "1,247", icon: FileText, trend: "+12%" },
    { title: "Resolved Today", value: "89", icon: CheckCircle, trend: "+8%" },
    { title: "High Priority", value: "23", icon: AlertTriangle, trend: "-5%" },
    { title: "Connected Stations", value: "156", icon: Shield, trend: "+2%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="dashboard" className="space-y-6">
            {/* Header Section */}
            <div className="text-center space-y-4 mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-3 bg-blue-600 rounded-full">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  Nationwide Police Crime Clock System
                </h1>
              </div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Advanced digital platform for crime data management, predictive policing, and community engagement across Kenya's police network
              </p>
              <div className="flex items-center justify-center gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Shield className="h-4 w-4 mr-1" />
                  Secure & Encrypted
                </Badge>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  AI-Powered Analytics
                </Badge>
                <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                  <MapPin className="h-4 w-4 mr-1" />
                  Geolocation Enabled
                </Badge>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statsData.map((stat, index) => (
                <Card key={index} className="border-l-4 border-l-blue-600 hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-5 w-5 text-blue-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <p className={`text-xs ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.trend} from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105" onClick={() => setActiveTab("occurrence-book")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Digital Occurrence Book
                  </CardTitle>
                  <CardDescription>
                    Streamlined crime reporting with search and retrieval capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Access OB System</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105" onClick={() => setActiveTab("crime-clock")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    Crime Clock Analytics
                  </CardTitle>
                  <CardDescription>
                    AI-powered predictive policing with real-time crime pattern analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">View Analytics</Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-105" onClick={() => setActiveTab("community-portal")}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Community Portal
                  </CardTitle>
                  <CardDescription>
                    Public reporting interface with geolocation-based station assignment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">Open Portal</Button>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status & Connectivity</CardTitle>
                <CardDescription>Real-time status of connected police stations and data sharing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">All Stations Connected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Data Sync Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm">Community Portal Live</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="occurrence-book">
            <DigitalOccurrenceBook />
          </TabsContent>

          <TabsContent value="crime-clock">
            <CrimeClockModule />
          </TabsContent>

          <TabsContent value="community-portal">
            <CommunityPortal />
          </TabsContent>

          <TabsContent value="crime-register">
            <CrimeRegister />
          </TabsContent>

          <TabsContent value="data-sharing">
            <DataSharingHub />
          </TabsContent>

          <TabsContent value="station-locator">
            <StationLocator />
          </TabsContent>

          <TabsContent value="officer-management">
            <OfficerManagement />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;

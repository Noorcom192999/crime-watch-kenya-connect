
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Download, Upload, Shield, Lock, Eye, FileText } from "lucide-react";

const CrimeRegister = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const evidenceItems = [
    {
      id: "EV/2024/001",
      caseId: "OB/001/2024",
      type: "Physical Evidence",
      description: "Mobile phone recovered from suspect",
      location: "Evidence Locker A-12",
      officer: "PC John Mwangi",
      dateCollected: "2024-01-15",
      status: "Secured",
      blockchain: "0x1a2b3c4d5e6f...",
      integrity: "Verified"
    },
    {
      id: "EV/2024/002", 
      caseId: "OB/002/2024",
      type: "Digital Evidence",
      description: "CCTV footage from incident location",
      location: "Digital Storage - Server 1",
      officer: "Sgt Mary Wanjiku",
      dateCollected: "2024-01-15",
      status: "Under Analysis",
      blockchain: "0x2b3c4d5e6f7a...",
      integrity: "Verified"
    },
    {
      id: "EV/2024/003",
      caseId: "OB/003/2024",
      type: "Document",
      description: "Witness statement and identification",
      location: "Digital Archive",
      officer: "PC David Kipchoge",
      dateCollected: "2024-01-16",
      status: "Processed",
      blockchain: "0x3c4d5e6f7a8b...",
      integrity: "Verified"
    }
  ];

  const caseFiles = [
    {
      id: "CF/2024/001",
      title: "Westlands Theft Investigation",
      leadOfficer: "Inspector Jane Kimani",
      status: "Active",
      evidenceCount: 5,
      lastUpdated: "2024-01-16",
      priority: "High"
    },
    {
      id: "CF/2024/002",
      title: "CBD Assault Case",
      leadOfficer: "Sergeant Paul Njoroge",
      status: "Under Review",
      evidenceCount: 3,
      lastUpdated: "2024-01-15",
      priority: "Medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Secured": return "bg-green-100 text-green-800";
      case "Under Analysis": return "bg-yellow-100 text-yellow-800";
      case "Processed": return "bg-blue-100 text-blue-800";
      case "Active": return "bg-green-100 text-green-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Crime Evidence Register</h2>
          <p className="text-gray-600">Secure blockchain-based evidence management system</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Evidence
          </Button>
        </div>
      </div>

      {/* Security Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-blue-600" />
            <div>
              <h3 className="font-semibold text-blue-900">Blockchain Security Enabled</h3>
              <p className="text-sm text-blue-700">
                All evidence entries are cryptographically secured and immutable. Chain integrity verified every 10 minutes.
              </p>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <Lock className="h-3 w-3 mr-1" />
              Secured
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="evidence" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="evidence">Evidence Items</TabsTrigger>
          <TabsTrigger value="cases">Case Files</TabsTrigger>
        </TabsList>

        <TabsContent value="evidence" className="space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search evidence by ID, case, type, or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline">Filter</Button>
              </div>
            </CardContent>
          </Card>

          {/* Evidence Items */}
          <div className="space-y-4">
            {evidenceItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{item.id}</h3>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        <Badge variant="outline">
                          Case: {item.caseId}
                        </Badge>
                        <Badge className="bg-green-100 text-green-800">
                          <Shield className="h-3 w-3 mr-1" />
                          {item.integrity}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Type:</span>
                          <p>{item.type}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Location:</span>
                          <p>{item.location}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Collected By:</span>
                          <p>{item.officer}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Date Collected:</span>
                          <p>{item.dateCollected}</p>
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-medium text-gray-600">Description:</span>
                          <p>{item.description}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-sm">
                          <Lock className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Blockchain Hash:</span>
                          <code className="text-xs bg-white px-2 py-1 rounded">{item.blockchain}</code>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cases" className="space-y-4">
          {/* Case Files */}
          <div className="space-y-4">
            {caseFiles.map((caseFile) => (
              <Card key={caseFile.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">{caseFile.title}</h3>
                        <Badge className={getStatusColor(caseFile.status)}>
                          {caseFile.status}
                        </Badge>
                        <Badge className={getPriorityColor(caseFile.priority)}>
                          {caseFile.priority} Priority
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-600">Case ID:</span>
                          <p>{caseFile.id}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Lead Officer:</span>
                          <p>{caseFile.leadOfficer}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Evidence Items:</span>
                          <p>{caseFile.evidenceCount} items</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Last Updated:</span>
                          <p>{caseFile.lastUpdated}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Open Case
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="h-4 w-4 mr-1" />
                        Add Evidence
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrimeRegister;

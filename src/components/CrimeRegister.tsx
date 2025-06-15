
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Download, Shield, Lock } from "lucide-react";
import { useEvidence } from "@/hooks/useEvidence";
import EvidenceItemCard from "./crime-register/EvidenceItemCard";
import CaseFileCard from "./crime-register/CaseFileCard";
import AddEvidenceForm from "./crime-register/AddEvidenceForm";

const CrimeRegister = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const { evidenceItems, caseFiles, loading } = useEvidence();

  const filteredEvidenceItems = evidenceItems.filter(item =>
    item.evidence_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.case_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <Button onClick={() => setShowAddForm(true)}>
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

      {/* Add Evidence Form */}
      {showAddForm && (
        <AddEvidenceForm
          onSuccess={() => setShowAddForm(false)}
          onCancel={() => setShowAddForm(false)}
        />
      )}

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
          {loading ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">Loading evidence items...</p>
              </CardContent>
            </Card>
          ) : filteredEvidenceItems.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  {searchTerm ? 'No evidence items match your search.' : 'No evidence items found.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredEvidenceItems.map((item) => (
                <EvidenceItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cases" className="space-y-4">
          {/* Case Files */}
          {loading ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">Loading case files...</p>
              </CardContent>
            </Card>
          ) : caseFiles.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">No case files found.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {caseFiles.map((caseFile) => (
                <CaseFileCard key={caseFile.id} caseFile={caseFile} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CrimeRegister;

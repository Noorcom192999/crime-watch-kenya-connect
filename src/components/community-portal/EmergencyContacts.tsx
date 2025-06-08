
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const EmergencyContacts = () => {
  const emergencyContacts = [
    { service: "Police Emergency", number: "999", available: "24/7" },
    { service: "Police Hotline", number: "0800 123 456", available: "24/7" },
    { service: "Crime Stoppers", number: "0800 654 321", available: "24/7" },
    { service: "Gender-Based Violence", number: "1195", available: "24/7" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="h-5 w-5" />
          Emergency Contacts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {emergencyContacts.map((contact, index) => (
          <div key={index} className="p-3 border rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{contact.service}</p>
                <p className="text-lg font-bold text-blue-600">{contact.number}</p>
                <p className="text-xs text-gray-500">{contact.available}</p>
              </div>
              <Button size="sm" variant="outline">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EmergencyContacts;

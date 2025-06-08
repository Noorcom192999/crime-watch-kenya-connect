
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Clock, Search, Navigation, Shield } from "lucide-react";

const StationLocator = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const policeStations = [
    {
      id: 1,
      name: "Nairobi Central Police Station",
      address: "University Way, Nairobi CBD",
      phone: "+254 20 222 2222",
      distance: "2.1 km",
      status: "24/7 Open",
      services: ["General Reporting", "Emergency Response", "Traffic"],
      coordinates: { lat: -1.2921, lng: 36.8219 },
      emergencyContacts: {
        main: "+254 20 222 2222",
        emergency: "999",
        whatsapp: "+254 700 000 001"
      }
    },
    {
      id: 2,
      name: "Westlands Police Station", 
      address: "Westlands Road, Westlands",
      phone: "+254 20 444 4444",
      distance: "5.3 km",
      status: "24/7 Open",
      services: ["Community Policing", "Crime Prevention", "General Reporting"],
      coordinates: { lat: -1.2676, lng: 36.8108 },
      emergencyContacts: {
        main: "+254 20 444 4444",
        emergency: "999", 
        whatsapp: "+254 700 000 002"
      }
    },
    {
      id: 3,
      name: "Karen Police Station",
      address: "Karen Road, Karen",
      phone: "+254 20 666 6666", 
      distance: "12.7 km",
      status: "24/7 Open",
      services: ["Domestic Violence Unit", "General Reporting", "Patrols"],
      coordinates: { lat: -1.3197, lng: 36.7070 },
      emergencyContacts: {
        main: "+254 20 666 6666",
        emergency: "999",
        whatsapp: "+254 700 000 003"
      }
    },
    {
      id: 4,
      name: "Kasarani Police Station",
      address: "Thika Road, Kasarani",
      phone: "+254 20 888 8888",
      distance: "18.2 km", 
      status: "24/7 Open",
      services: ["Traffic Police", "General Reporting", "Youth Crime Prevention"],
      coordinates: { lat: -1.2297, lng: 36.8869 },
      emergencyContacts: {
        main: "+254 20 888 8888",
        emergency: "999",
        whatsapp: "+254 700 000 004"
      }
    }
  ];

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setSearchLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleDirections = (station: any) => {
    const { lat, lng } = station.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, '_blank');
  };

  const handleCall = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Police Station Locator</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find the nearest police station, get directions, and access emergency contact information
        </p>
      </div>

      {/* Location Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Find Nearest Police Station
          </CardTitle>
          <CardDescription>Enter your location or use GPS to find nearby stations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Enter your address or location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <Button variant="outline" onClick={handleGetLocation}>
              <Navigation className="h-4 w-4 mr-2" />
              Use GPS
            </Button>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>

          {userLocation && (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <MapPin className="h-4 w-4" />
              Location detected: {searchLocation}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Quick Actions */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Emergency Situation?</h3>
                <p className="text-sm text-red-700">For immediate assistance, call emergency services</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                onClick={() => handleCall("999")}
                className="bg-red-600 hover:bg-red-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call 999
              </Button>
              <Button 
                variant="outline" 
                onClick={() => handleCall("0800123456")}
                className="border-red-300 text-red-700 hover:bg-red-100"
              >
                Police Hotline
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Police Stations List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Nearby Police Stations</h3>
        
        {policeStations.map((station) => (
          <Card key={station.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{station.name}</h4>
                      <p className="text-gray-600 flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {station.address}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <Badge className="bg-green-100 text-green-800">
                          <Clock className="h-3 w-3 mr-1" />
                          {station.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{station.distance} away</span>
                      </div>
                    </div>
                  </div>

                  {/* Services */}
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">Available Services:</p>
                    <div className="flex flex-wrap gap-2">
                      {station.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Main Line</p>
                        <p className="text-blue-600">{station.emergencyContacts.main}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Emergency</p>
                        <p className="text-red-600 font-bold">{station.emergencyContacts.emergency}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-green-600">{station.emergencyContacts.whatsapp}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDirections(station)}
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Directions
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCall(station.emergencyContacts.main)}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Station
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleCall(station.emergencyContacts.whatsapp)}
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Map</CardTitle>
          <CardDescription>Visual representation of police stations in your area</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p>Interactive map would be displayed here</p>
              <p className="text-sm">Showing police stations and current location</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StationLocator;

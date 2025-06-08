
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Clock, AlertTriangle, Shield, Target } from "lucide-react";

const CrimeClockModule = () => {
  const hourlyData = [
    { hour: "00:00", crimes: 12, predictions: 15 },
    { hour: "03:00", crimes: 8, predictions: 10 },
    { hour: "06:00", crimes: 15, predictions: 18 },
    { hour: "09:00", crimes: 25, predictions: 22 },
    { hour: "12:00", crimes: 35, predictions: 38 },
    { hour: "15:00", crimes: 42, predictions: 45 },
    { hour: "18:00", crimes: 55, predictions: 52 },
    { hour: "21:00", crimes: 38, predictions: 40 },
  ];

  const crimeTypeData = [
    { type: "Theft", count: 145, percentage: 35, color: "#3b82f6" },
    { type: "Assault", count: 89, percentage: 22, color: "#ef4444" },
    { type: "Burglary", count: 67, percentage: 16, color: "#f59e0b" },
    { type: "Fraud", count: 45, percentage: 11, color: "#10b981" },
    { type: "Vandalism", count: 32, percentage: 8, color: "#8b5cf6" },
    { type: "Other", count: 34, percentage: 8, color: "#6b7280" },
  ];

  const locationData = [
    { location: "Nairobi CBD", crimes: 156, trend: "+12%" },
    { location: "Westlands", crimes: 89, trend: "-5%" },
    { location: "Eastlands", crimes: 134, trend: "+8%" },
    { location: "Karen", crimes: 45, trend: "-2%" },
    { location: "Kibera", crimes: 167, trend: "+15%" },
  ];

  const predictions = [
    {
      type: "High Risk Period",
      time: "6:00 PM - 9:00 PM",
      confidence: "92%",
      area: "Nairobi CBD",
      crimes: ["Theft", "Robbery"]
    },
    {
      type: "Medium Risk",
      time: "12:00 PM - 3:00 PM", 
      confidence: "78%",
      area: "Eastlands",
      crimes: ["Burglary", "Vandalism"]
    },
    {
      type: "Emerging Pattern",
      time: "Weekend Nights",
      confidence: "85%",
      area: "Westlands",
      crimes: ["Assault", "Domestic Violence"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Crime Clock Analytics</h2>
          <p className="text-gray-600">AI-powered crime pattern analysis and predictive policing</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="today">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>Generate Report</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Peak Crime Hour</p>
                <p className="text-2xl font-bold">6:00 PM</p>
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +15% from last week
                </p>
              </div>
              <Clock className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk Area</p>
                <p className="text-2xl font-bold">Kibera</p>
                <p className="text-xs text-orange-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  167 incidents
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prediction Accuracy</p>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +3% improvement
                </p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Prevention Rate</p>
                <p className="text-2xl font-bold">23%</p>
                <p className="text-xs text-blue-600 flex items-center gap-1">
                  <Shield className="h-3 w-3" />
                  Crimes prevented
                </p>
              </div>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Crime Pattern */}
        <Card>
          <CardHeader>
            <CardTitle>24-Hour Crime Pattern</CardTitle>
            <CardDescription>Actual vs Predicted crime occurrences by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="crimes" stroke="#3b82f6" strokeWidth={2} name="Actual Crimes" />
                <Line type="monotone" dataKey="predictions" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="AI Predictions" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Crime Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Crime Types Distribution</CardTitle>
            <CardDescription>Breakdown of crime categories this month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={crimeTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  label={({ type, percentage }) => `${type} (${percentage}%)`}
                >
                  {crimeTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Location Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Crime Hotspots Analysis</CardTitle>
          <CardDescription>Geographic distribution and trends by location</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {locationData.map((location, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h4 className="font-semibold">{location.location}</h4>
                <p className="text-2xl font-bold text-blue-600">{location.crimes}</p>
                <p className={`text-sm flex items-center gap-1 ${
                  location.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'
                }`}>
                  {location.trend.startsWith('+') ? 
                    <TrendingUp className="h-3 w-3" /> : 
                    <TrendingDown className="h-3 w-3" />
                  }
                  {location.trend}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>AI Crime Predictions</CardTitle>
          <CardDescription>Machine learning insights for proactive policing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant={prediction.type === "High Risk Period" ? "destructive" : 
                                   prediction.type === "Medium Risk" ? "secondary" : "default"}>
                        {prediction.type}
                      </Badge>
                      <span className="text-sm font-medium">Confidence: {prediction.confidence}</span>
                    </div>
                    <p className="font-semibold">{prediction.time} - {prediction.area}</p>
                    <p className="text-sm text-gray-600">
                      Predicted crimes: {prediction.crimes.join(", ")}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Deploy Resources</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrimeClockModule;


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Clock, AlertTriangle, Shield, Target, RefreshCw } from "lucide-react";
import { useCrimeAnalytics } from "@/hooks/useCrimeAnalytics";

const CrimeClockModule = () => {
  const { analyticsData, loading, fetchCrimeAnalytics } = useCrimeAnalytics();

  if (loading || !analyticsData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Crime Clock Analytics</h2>
            <p className="text-gray-600">Loading AI-powered crime pattern analysis...</p>
          </div>
          <div className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 animate-spin" />
            <span className="text-sm text-gray-500">Loading data...</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="pt-6">
                <div className="h-20 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const { hourlyData, crimeTypeData, locationData, keyMetrics, predictions } = analyticsData;

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
          <Button onClick={fetchCrimeAnalytics} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
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
                <p className="text-2xl font-bold">{keyMetrics.peakHour}</p>
                <p className="text-xs text-red-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  High activity period
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
                <p className="text-2xl font-bold">{keyMetrics.highRiskArea}</p>
                <p className="text-xs text-orange-600 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Requires attention
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
                <p className="text-2xl font-bold">{keyMetrics.predictionAccuracy}%</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  AI improving
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
                <p className="text-2xl font-bold">{keyMetrics.preventionRate}%</p>
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
            <ChartContainer
              config={{
                crimes: {
                  label: "Actual Crimes",
                  color: "#3b82f6",
                },
                predictions: {
                  label: "AI Predictions",
                  color: "#ef4444",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line 
                    type="monotone" 
                    dataKey="crimes" 
                    stroke="var(--color-crimes)" 
                    strokeWidth={2} 
                    name="Actual Crimes" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="predictions" 
                    stroke="var(--color-predictions)" 
                    strokeWidth={2} 
                    strokeDasharray="5 5" 
                    name="AI Predictions" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Crime Types Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Crime Types Distribution</CardTitle>
            <CardDescription>Breakdown of crime categories from real data</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={crimeTypeData.reduce((acc, item) => ({
                ...acc,
                [item.type.toLowerCase().replace(/\s+/g, '')]: {
                  label: item.type,
                  color: item.color,
                },
              }), {})}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
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
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Location Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Crime Hotspots Analysis</CardTitle>
          <CardDescription>Geographic distribution and trends by location from real data</CardDescription>
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
          <CardDescription>Machine learning insights for proactive policing based on real patterns</CardDescription>
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

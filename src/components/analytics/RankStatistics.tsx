
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Star, TrendingUp, Users } from "lucide-react";
import { KENYA_POLICE_RANKS, getRankAbbreviation, getSupervisionLevel } from "@/utils/policeRanks";

interface RankStatisticsProps {
  officerData: Array<{
    rank: string;
    count: number;
    activeCount: number;
    percentage: number;
  }>;
}

const RankStatistics = ({ officerData }: RankStatisticsProps) => {
  const chartColors = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#6b7280'];
  
  const supervisionLevels = officerData.reduce((acc, item) => {
    const level = getSupervisionLevel(item.rank as any);
    const existing = acc.find(l => l.level === level);
    if (existing) {
      existing.count += item.count;
    } else {
      acc.push({ level, count: item.count });
    }
    return acc;
  }, [] as Array<{ level: string; count: number }>);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rank Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Officer Rank Distribution</CardTitle>
            <CardDescription>Current personnel by Kenya Police Service ranks</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: {
                  label: "Officers",
                  color: "#3b82f6",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={officerData.slice(0, 8)} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    dataKey="rank" 
                    type="category" 
                    width={120}
                    tickFormatter={(value) => getRankAbbreviation(value)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Supervision Levels */}
        <Card>
          <CardHeader>
            <CardTitle>Supervision Levels</CardTitle>
            <CardDescription>Officers grouped by command hierarchy</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={supervisionLevels.reduce((acc, item, index) => ({
                ...acc,
                [item.level.toLowerCase().replace(/\s+/g, '')]: {
                  label: item.level,
                  color: chartColors[index] || '#6b7280',
                },
              }), {})}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={supervisionLevels}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    label={({ level, count }) => `${level}: ${count}`}
                  >
                    {supervisionLevels.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={chartColors[index] || '#6b7280'} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Rank Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Rank Overview</CardTitle>
          <CardDescription>Detailed breakdown of officer ranks and activity status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {officerData.slice(0, 8).map((rank, index) => (
              <div key={rank.rank} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">
                    {getRankAbbreviation(rank.rank as any)}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-gray-500">
                      {KENYA_POLICE_RANKS.indexOf(rank.rank as any) + 1}
                    </span>
                  </div>
                </div>
                
                <h4 className="font-semibold text-sm mb-1">{rank.rank}</h4>
                <p className="text-xs text-gray-500 mb-3">{getSupervisionLevel(rank.rank as any)}</p>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total</span>
                    <span className="font-semibold">{rank.count}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Active</span>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold text-green-600">{rank.activeCount}</span>
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">% of Force</span>
                    <span className="font-semibold">{rank.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RankStatistics;


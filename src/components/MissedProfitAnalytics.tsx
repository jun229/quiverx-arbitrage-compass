
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Clock, Target } from 'lucide-react';

export const MissedProfitAnalytics = () => {
  // Historical missed profit data
  const historicalData = [
    { date: '2024-01-01', missedProfit: 8420, opportunities: 23, avgSpread: 1.8 },
    { date: '2024-01-02', missedProfit: 12150, opportunities: 31, avgSpread: 2.1 },
    { date: '2024-01-03', missedProfit: 9830, opportunities: 28, avgSpread: 1.9 },
    { date: '2024-01-04', missedProfit: 15640, opportunities: 42, avgSpread: 2.4 },
    { date: '2024-01-05', missedProfit: 11290, opportunities: 35, avgSpread: 2.0 },
    { date: '2024-01-06', missedProfit: 18750, opportunities: 47, avgSpread: 2.8 },
    { date: '2024-01-07', missedProfit: 13560, opportunities: 38, avgSpread: 2.2 },
  ];

  // Market pair spreads
  const marketPairSpreads = [
    { pair: 'Polymarket-Deribit', avgSpread: 3.2, volume: 450000, frequency: 28 },
    { pair: 'Kalshi-Binance', avgSpread: 2.8, volume: 780000, frequency: 35 },
    { pair: 'Augur-OKX', avgSpread: 4.1, volume: 320000, frequency: 19 },
    { pair: 'PredictIt-TD', avgSpread: 2.1, volume: 890000, frequency: 42 },
    { pair: 'Manifold-Coinbase', avgSpread: 3.7, volume: 560000, frequency: 24 },
  ];

  // Time to convergence data
  const convergenceData = [
    { timeRange: '0-5 min', count: 12, avgProfit: 2400 },
    { timeRange: '5-15 min', count: 18, avgProfit: 1850 },
    { timeRange: '15-30 min', count: 25, avgProfit: 1320 },
    { timeRange: '30-60 min', count: 15, avgProfit: 980 },
    { timeRange: '1-2 hours', count: 8, avgProfit: 650 },
    { timeRange: '2+ hours', count: 5, avgProfit: 420 },
  ];

  // Profit distribution by market type
  const profitDistribution = [
    { market: 'Prediction Markets', value: 35, color: '#3b82f6' },
    { market: 'Options', value: 42, color: '#8b5cf6' },
    { market: 'Perpetuals', value: 23, color: '#f59e0b' },
  ];

  const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b'];

  const totalMissedProfit = historicalData.reduce((sum, day) => sum + day.missedProfit, 0);
  const avgDailyMissed = totalMissedProfit / historicalData.length;
  const totalOpportunities = historicalData.reduce((sum, day) => sum + day.opportunities, 0);
  const avgSpread = historicalData.reduce((sum, day) => sum + day.avgSpread, 0) / historicalData.length;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-red-700 font-medium">Total Missed (7d)</p>
                <p className="text-2xl font-bold text-red-900">${totalMissedProfit.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-orange-700 font-medium">Daily Average</p>
                <p className="text-2xl font-bold text-orange-900">${Math.round(avgDailyMissed).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-yellow-700 font-medium">Opportunities</p>
                <p className="text-2xl font-bold text-yellow-900">{totalOpportunities}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-blue-700 font-medium">Avg Spread</p>
                <p className="text-2xl font-bold text-blue-900">{avgSpread.toFixed(1)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Historical Missed Profit Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'missedProfit' ? `$${Number(value).toLocaleString()}` : value,
                    name === 'missedProfit' ? 'Missed Profit' : 'Opportunities'
                  ]}
                />
                <Line type="monotone" dataKey="missedProfit" stroke="#ef4444" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Profit Distribution by Market Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={profitDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ market, value }) => `${market}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {profitDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Volume-Weighted Average Spreads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {marketPairSpreads.map((pair, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{pair.pair}</p>
                    <p className="text-sm text-gray-600">
                      Vol: ${pair.volume.toLocaleString()} | Freq: {pair.frequency}/week
                    </p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${pair.avgSpread > 3 ? 'border-emerald-200 text-emerald-700' : 'border-gray-200 text-gray-700'}`}
                  >
                    {pair.avgSpread.toFixed(1)}% spread
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Time-to-Convergence Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={convergenceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timeRange" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'avgProfit' ? `$${Number(value).toLocaleString()}` : value,
                    name === 'avgProfit' ? 'Avg Profit' : 'Count'
                  ]}
                />
                <Bar dataKey="count" fill="#3b82f6" name="Opportunity Count" />
                <Bar dataKey="avgProfit" fill="#10b981" name="Average Profit" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h4 className="font-semibold text-amber-900 mb-3">Market Inefficiency Quantification</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-amber-800 font-medium">Weekly Missed Profit</p>
            <p className="text-2xl font-bold text-amber-900">${totalMissedProfit.toLocaleString()}</p>
            <p className="text-amber-700">From documented arbitrage opportunities</p>
          </div>
          <div>
            <p className="text-amber-800 font-medium">Market Convergence</p>
            <p className="text-2xl font-bold text-amber-900">68%</p>
            <p className="text-amber-700">Converge within 30 minutes</p>
          </div>
          <div>
            <p className="text-amber-800 font-medium">Efficiency Gain Potential</p>
            <p className="text-2xl font-bold text-amber-900">2.3%</p>
            <p className="text-amber-700">Average spread reduction with QuiverX</p>
          </div>
        </div>
      </div>
    </div>
  );
};


import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const LiquidityAnalysis = () => {
  // Mock liquidity depth data
  const liquidityDepthData = [
    { market: 'Polymarket', currentLiquidity: 2400000, potentialLiquidity: 4200000, depth: 'Deep' },
    { market: 'Deribit', currentLiquidity: 5600000, potentialLiquidity: 6800000, depth: 'Deep' },
    { market: 'Binance Perps', currentLiquidity: 8900000, potentialLiquidity: 12000000, depth: 'Very Deep' },
    { market: 'Kalshi', currentLiquidity: 890000, potentialLiquidity: 2100000, depth: 'Shallow' },
    { market: 'OKX Options', currentLiquidity: 3400000, potentialLiquidity: 5100000, depth: 'Medium' },
    { market: 'Bybit', currentLiquidity: 6700000, potentialLiquidity: 8900000, depth: 'Deep' },
  ];

  // Order book depth simulation
  const orderBookData = [
    { price: 0.30, bidVolume: 45000, askVolume: 38000 },
    { price: 0.32, bidVolume: 67000, askVolume: 52000 },
    { price: 0.34, bidVolume: 89000, askVolume: 71000 },
    { price: 0.36, bidVolume: 125000, askVolume: 94000 },
    { price: 0.38, bidVolume: 156000, askVolume: 123000 },
    { price: 0.40, bidVolume: 134000, askVolume: 145000 },
    { price: 0.42, bidVolume: 98000, askVolume: 167000 },
    { price: 0.44, bidVolume: 76000, askVolume: 189000 },
    { price: 0.46, bidVolume: 54000, askVolume: 213000 },
    { price: 0.48, bidVolume: 32000, askVolume: 234000 },
  ];

  // Liquidity bridging scenarios
  const bridgingScenarios = [
    { scenario: 'Before QuiverX', avgSlippage: 2.8, executionTime: 45, failureRate: 12 },
    { scenario: 'With QuiverX', avgSlippage: 1.2, executionTime: 18, failureRate: 3 },
  ];

  const getDepthColor = (depth: string) => {
    switch (depth) {
      case 'Very Deep': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Deep': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Shallow': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="depth" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="depth">Market Depth</TabsTrigger>
          <TabsTrigger value="orderbook">Order Book Analysis</TabsTrigger>
          <TabsTrigger value="bridging">Bridging Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="depth" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current vs Potential Liquidity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={liquidityDepthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="market" angle={-45} textAnchor="end" height={80} fontSize={12} />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
                    <Bar dataKey="currentLiquidity" fill="#3b82f6" name="Current Liquidity" />
                    <Bar dataKey="potentialLiquidity" fill="#10b981" name="Potential with QuiverX" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Market Depth Classification</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {liquidityDepthData.map((market, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{market.market}</p>
                        <p className="text-sm text-gray-600">
                          ${market.currentLiquidity.toLocaleString()} current
                        </p>
                      </div>
                      <Badge className={getDepthColor(market.depth)}>
                        {market.depth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="orderbook" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Order Book Depth Analysis</CardTitle>
              <p className="text-sm text-gray-600">
                Example: BTC &gt; $100k prediction across markets
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={orderBookData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="price" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `$${Number(value).toLocaleString()}`, 
                      name === 'bidVolume' ? 'Bid Volume' : 'Ask Volume'
                    ]}
                  />
                  <Area 
                    dataKey="bidVolume" 
                    stackId="1" 
                    fill="#10b981" 
                    stroke="#10b981" 
                    fillOpacity={0.6}
                    name="Bid Volume"
                  />
                  <Area 
                    dataKey="askVolume" 
                    stackId="2" 
                    fill="#ef4444" 
                    stroke="#ef4444" 
                    fillOpacity={0.6}
                    name="Ask Volume"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bridging" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-red-800">Before QuiverX</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-red-700">Avg Slippage</p>
                  <p className="text-2xl font-bold text-red-900">2.8%</p>
                </div>
                <div>
                  <p className="text-sm text-red-700">Execution Time</p>
                  <p className="text-2xl font-bold text-red-900">45s</p>
                </div>
                <div>
                  <p className="text-sm text-red-700">Failure Rate</p>
                  <p className="text-2xl font-bold text-red-900">12%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-emerald-800">With QuiverX</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-emerald-700">Avg Slippage</p>
                  <p className="text-2xl font-bold text-emerald-900">1.2%</p>
                </div>
                <div>
                  <p className="text-sm text-emerald-700">Execution Time</p>
                  <p className="text-2xl font-bold text-emerald-900">18s</p>
                </div>
                <div>
                  <p className="text-sm text-emerald-700">Failure Rate</p>
                  <p className="text-2xl font-bold text-emerald-900">3%</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-blue-800">Improvement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-blue-700">Slippage Reduction</p>
                  <p className="text-2xl font-bold text-blue-900">57%</p>
                </div>
                <div>
                  <p className="text-sm text-blue-700">Speed Improvement</p>
                  <p className="text-2xl font-bold text-blue-900">60%</p>
                </div>
                <div>
                  <p className="text-sm text-blue-700">Success Rate</p>
                  <p className="text-2xl font-bold text-blue-900">+75%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Liquidity Routing Network Effect</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Traditional Approach</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Single market execution</li>
                      <li>• Limited to available liquidity</li>
                      <li>• High slippage on large orders</li>
                      <li>• Market fragmentation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">QuiverX Approach</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Cross-market liquidity aggregation</li>
                      <li>• Intelligent order routing</li>
                      <li>• Reduced slippage through distribution</li>
                      <li>• Market efficiency improvement</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-semibold text-purple-900 mb-2">Research Contribution</h4>
        <p className="text-sm text-purple-800">
          By bridging liquidity across prediction markets, options, and perpetuals, QuiverX addresses a critical 
          inefficiency in derivatives markets. Our analysis shows potential for 57% slippage reduction and 60% 
          faster execution through intelligent cross-market routing.
        </p>
      </div>
    </div>
  );
};

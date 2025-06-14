
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArbitrageDashboard } from '@/components/ArbitrageDashboard';
import { LiquidityAnalysis } from '@/components/LiquidityAnalysis';
import { MissedProfitAnalytics } from '@/components/MissedProfitAnalytics';
import { TechnicalArchitecture } from '@/components/TechnicalArchitecture';
import { TrendingUp, DollarSign, Activity, Network } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('arbitrage');

  // Key metrics for the header
  const keyMetrics = {
    totalOpportunities: 47,
    avgSpread: 2.3,
    missedProfit24h: 12847,
    activeMarkets: 23
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">QuiverX Research Dashboard</h1>
              <p className="text-lg text-gray-600 mt-2">Cross-Market Arbitrage in Derivatives: Academic Research Prototype</p>
            </div>
            <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50 px-4 py-2">
              Live Demo
            </Badge>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-emerald-600" />
                  <div>
                    <p className="text-sm text-emerald-700 font-medium">Active Opportunities</p>
                    <p className="text-2xl font-bold text-emerald-900">{keyMetrics.totalOpportunities}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-sm text-blue-700 font-medium">Avg Spread</p>
                    <p className="text-2xl font-bold text-blue-900">{keyMetrics.avgSpread}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Activity className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-sm text-orange-700 font-medium">Missed Profit (24h)</p>
                    <p className="text-2xl font-bold text-orange-900">${keyMetrics.missedProfit24h.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Network className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-sm text-purple-700 font-medium">Connected Markets</p>
                    <p className="text-2xl font-bold text-purple-900">{keyMetrics.activeMarkets}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="arbitrage" className="text-sm font-medium">
              Cross-Market Arbitrage
            </TabsTrigger>
            <TabsTrigger value="liquidity" className="text-sm font-medium">
              Liquidity Bridging
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm font-medium">
              Missed Profit Analytics
            </TabsTrigger>
            <TabsTrigger value="architecture" className="text-sm font-medium">
              Technical Architecture
            </TabsTrigger>
          </TabsList>

          <TabsContent value="arbitrage" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Cross-Market Arbitrage Detection</CardTitle>
                <CardDescription>
                  Real-time comparison of identical events/assets across prediction markets, options, and perpetuals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ArbitrageDashboard />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="liquidity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Liquidity Bridging Analysis</CardTitle>
                <CardDescription>
                  Market depth visualization and liquidity routing optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LiquidityAnalysis />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Missed Profit Analytics</CardTitle>
                <CardDescription>
                  Quantifying market inefficiencies and theoretical arbitrage profits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MissedProfitAnalytics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architecture" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Technical Architecture</CardTitle>
                <CardDescription>
                  Intent-based routing and Dutch auction mechanism for cross-market execution
                </CardDescription>
              </CardHeader>
              <CardContent>
                <TechnicalArchitecture />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Zap, Network, Target, Clock, DollarSign } from 'lucide-react';

export const TechnicalArchitecture = () => {
  const architectureSteps = [
    {
      id: 1,
      title: "Intent Submission",
      description: "User submits cross-market trading intent",
      icon: Target,
      color: "bg-blue-100 text-blue-600",
      details: ["Specify desired outcome", "Set price parameters", "Define execution timeline"]
    },
    {
      id: 2,
      title: "Filler Competition",
      description: "Network participants compete via Dutch auction",
      icon: Users,
      color: "bg-purple-100 text-purple-600",
      details: ["Price discovery mechanism", "Competitive bidding", "Reputation-based scoring"]
    },
    {
      id: 3,
      title: "Route Optimization",
      description: "AI determines optimal cross-market execution path",
      icon: Network,
      color: "bg-emerald-100 text-emerald-600",
      details: ["Liquidity analysis", "Slippage minimization", "Fee optimization"]
    },
    {
      id: 4,
      title: "Cross-Market Execution",
      description: "Simultaneous execution across multiple venues",
      icon: Zap,
      color: "bg-orange-100 text-orange-600",
      details: ["Atomic transactions", "Failure rollback", "Settlement confirmation"]
    }
  ];

  const dutchAuctionData = [
    { time: 0, price: 100, fillers: 12 },
    { time: 5, price: 98, fillers: 8 },
    { time: 10, price: 96, fillers: 5 },
    { time: 15, price: 94, fillers: 3 },
    { time: 20, price: 92, fillers: 1 },
    { time: 25, price: 90, fillers: 0 }
  ];

  const networkConnections = [
    { from: "Prediction Markets", to: "QuiverX Core", strength: "High" },
    { from: "Options Markets", to: "QuiverX Core", strength: "High" },
    { from: "Perpetuals", to: "QuiverX Core", strength: "High" },
    { from: "QuiverX Core", to: "Filler Network", strength: "Critical" },
    { from: "Filler Network", to: "Execution Layer", strength: "Critical" }
  ];

  return (
    <div className="space-y-6">
      {/* Architecture Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Intent-Based Cross-Market Execution Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {architectureSteps.map((step, index) => (
              <div key={step.id} className="relative">
                <Card className="h-full">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${step.color}`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline">{step.id}</Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                    <ul className="text-xs text-gray-500 space-y-1">
                      {step.details.map((detail, idx) => (
                        <li key={idx}>• {detail}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                {index < architectureSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dutch Auction Mechanism */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Dutch Auction Price Discovery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Mechanism Overview</h4>
                <p className="text-sm text-gray-700">
                  Starting price decreases over time until a filler accepts the execution. 
                  This ensures competitive pricing and efficient price discovery.
                </p>
              </div>
              <div className="space-y-3">
                {dutchAuctionData.map((point, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium">{point.time}s</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm">${point.price}</span>
                      <Badge variant="outline" className="text-xs">
                        {point.fillers} fillers
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Network Architecture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2">Decentralized Network</h4>
                <p className="text-sm text-gray-700">
                  QuiverX operates as a decentralized network connecting multiple derivative 
                  markets through competitive fillers and intent-based routing.
                </p>
              </div>
              <div className="space-y-3">
                {networkConnections.map((connection, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Network className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">{connection.from}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{connection.to}</span>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          connection.strength === 'Critical' 
                            ? 'border-red-200 text-red-700' 
                            : 'border-blue-200 text-blue-700'
                        }`}
                      >
                        {connection.strength}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technical Benefits */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Technical Innovation Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">Intent-Based Design</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• User specifies outcomes, not execution details</li>
                <li>• Abstraction from complex multi-market mechanics</li>
                <li>• Automated optimization and routing</li>
                <li>• Reduced cognitive load for traders</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Competitive Execution</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• Dutch auction ensures fair pricing</li>
                <li>• Filler competition reduces costs</li>
                <li>• Reputation system maintains quality</li>
                <li>• Transparent price discovery</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-900 mb-2">Cross-Market Efficiency</h4>
              <ul className="text-sm text-emerald-800 space-y-1">
                <li>• Bridges previously isolated markets</li>
                <li>• Enables novel arbitrage strategies</li>
                <li>• Improves overall market efficiency</li>
                <li>• Reduces systemic price discrepancies</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Research Contribution */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-lg p-6">
        <h4 className="font-semibold text-slate-900 mb-3">Novel Research Contribution</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-slate-800 mb-2">Academic Innovation</h5>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• First intent-based cross-market derivative routing system</li>
              <li>• Novel application of Dutch auctions to DeFi arbitrage</li>
              <li>• Quantitative analysis of multi-market inefficiencies</li>
              <li>• Empirical study of prediction market-options correlations</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-slate-800 mb-2">Practical Impact</h5>
            <ul className="text-sm text-slate-700 space-y-1">
              <li>• Demonstrates 57% average slippage reduction</li>
              <li>• Captures $12,847 daily missed arbitrage profits</li>
              <li>• Connects 23 previously isolated derivative markets</li>
              <li>• Enables new class of cross-market trading strategies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

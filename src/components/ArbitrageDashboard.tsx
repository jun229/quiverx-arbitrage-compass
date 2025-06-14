
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface ArbitrageOpportunity {
  id: string;
  event: string;
  predictionMarket: {
    platform: string;
    price: number;
    volume: number;
  };
  options: {
    platform: string;
    price: number;
    volume: number;
  };
  perpetuals: {
    platform: string;
    price: number;
    volume: number;
  };
  spread: number;
  profitPotential: number;
  timeToExpiry: string;
}

export const ArbitrageDashboard = () => {
  const [sortBy, setSortBy] = useState<'spread' | 'profit'>('spread');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Mock data structure ready for API integration
  const arbitrageData: ArbitrageOpportunity[] = [
    {
      id: '1',
      event: 'BTC > $100k by Dec 2024',
      predictionMarket: { platform: 'Polymarket', price: 0.34, volume: 125000 },
      options: { platform: 'Deribit', price: 0.41, volume: 89000 },
      perpetuals: { platform: 'Binance', price: 0.38, volume: 340000 },
      spread: 7.2,
      profitPotential: 2847,
      timeToExpiry: '45d'
    },
    {
      id: '2',
      event: 'ETH > $5k by Q1 2025',
      predictionMarket: { platform: 'Kalshi', price: 0.67, volume: 78000 },
      options: { platform: 'OKX', price: 0.72, volume: 156000 },
      perpetuals: { platform: 'Bybit', price: 0.69, volume: 234000 },
      spread: 5.8,
      profitPotential: 1923,
      timeToExpiry: '67d'
    },
    {
      id: '3',
      event: 'Tesla Q4 Earnings Beat',
      predictionMarket: { platform: 'Augur', price: 0.58, volume: 45000 },
      options: { platform: 'TD Ameritrade', price: 0.64, volume: 123000 },
      perpetuals: { platform: 'FTX', price: 0.61, volume: 87000 },
      spread: 6.1,
      profitPotential: 1534,
      timeToExpiry: '12d'
    },
    {
      id: '4',
      event: 'Fed Rate Cut March 2025',
      predictionMarket: { platform: 'PredictIt', price: 0.73, volume: 167000 },
      options: { platform: 'Interactive Brokers', price: 0.78, volume: 234000 },
      perpetuals: { platform: 'Kraken', price: 0.75, volume: 145000 },
      spread: 4.2,
      profitPotential: 987,
      timeToExpiry: '89d'
    },
    {
      id: '5',
      event: 'AI Chip Shortage Resolution',
      predictionMarket: { platform: 'Manifold', price: 0.42, volume: 67000 },
      options: { platform: 'Robinhood', price: 0.48, volume: 98000 },
      perpetuals: { platform: 'Coinbase', price: 0.45, volume: 178000 },
      spread: 5.4,
      profitPotential: 1245,
      timeToExpiry: '156d'
    }
  ];

  const sortedData = [...arbitrageData].sort((a, b) => {
    const aVal = sortBy === 'spread' ? a.spread : a.profitPotential;
    const bVal = sortBy === 'spread' ? b.spread : b.profitPotential;
    return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
  });

  const handleSort = (column: 'spread' | 'profit') => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortOrder('desc');
    }
  };

  const getProfitColor = (profit: number) => {
    if (profit > 2000) return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (profit > 1000) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getSpreadColor = (spread: number) => {
    if (spread > 6) return 'text-emerald-600 font-bold';
    if (spread > 4) return 'text-yellow-600 font-semibold';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={sortBy === 'spread' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSort('spread')}
            className="flex items-center gap-1"
          >
            Sort by Spread
            {sortBy === 'spread' && (
              sortOrder === 'desc' ? <ArrowDownIcon className="h-4 w-4" /> : <ArrowUpIcon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant={sortBy === 'profit' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSort('profit')}
            className="flex items-center gap-1"
          >
            Sort by Profit
            {sortBy === 'profit' && (
              sortOrder === 'desc' ? <ArrowDownIcon className="h-4 w-4" /> : <ArrowUpIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {arbitrageData.length} Active Opportunities
        </Badge>
      </div>

      <div className="rounded-lg border bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Event/Asset</TableHead>
              <TableHead className="font-semibold">Prediction Market</TableHead>
              <TableHead className="font-semibold">Options</TableHead>
              <TableHead className="font-semibold">Perpetuals</TableHead>
              <TableHead className="font-semibold">Spread %</TableHead>
              <TableHead className="font-semibold">Profit Potential</TableHead>
              <TableHead className="font-semibold">Time to Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((opportunity) => (
              <TableRow key={opportunity.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">
                  <div className="max-w-[200px]">
                    <p className="text-sm font-semibold text-gray-900 truncate">{opportunity.event}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-blue-600">{opportunity.predictionMarket.platform}</p>
                    <p className="text-sm text-gray-600">${opportunity.predictionMarket.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Vol: ${opportunity.predictionMarket.volume.toLocaleString()}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-purple-600">{opportunity.options.platform}</p>
                    <p className="text-sm text-gray-600">${opportunity.options.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Vol: ${opportunity.options.volume.toLocaleString()}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-orange-600">{opportunity.perpetuals.platform}</p>
                    <p className="text-sm text-gray-600">${opportunity.perpetuals.price.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">Vol: ${opportunity.perpetuals.volume.toLocaleString()}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <span className={`text-lg font-bold ${getSpreadColor(opportunity.spread)}`}>
                    {opportunity.spread.toFixed(1)}%
                  </span>
                </TableCell>
                <TableCell>
                  <Badge className={getProfitColor(opportunity.profitPotential)}>
                    ${opportunity.profitPotential.toLocaleString()}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-gray-600">
                    {opportunity.timeToExpiry}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Research Insight</h4>
        <p className="text-sm text-blue-800">
          Cross-market price discrepancies indicate significant market inefficiencies. QuiverX's intent-based routing 
          can capture these arbitrage opportunities by automatically executing trades across prediction markets, 
          traditional options, and crypto perpetuals when spreads exceed transaction costs.
        </p>
      </div>
    </div>
  );
};

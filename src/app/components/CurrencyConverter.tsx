import { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, ArrowDownUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CompanyFooter } from './CompanyFooter';
import { MiniProfileHeader } from './MiniProfileHeader';

interface CurrencyConverterProps {
  onBack: () => void;
  onShare: () => void;
}

export function CurrencyConverter({ onBack, onShare }: CurrencyConverterProps) {
  const [amount, setAmount] = useState('100000');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  // Mock exchange rates (in production, fetch from API)
  const exchangeRates: Record<string, Record<string, number>> = {
    USD: { EUR: 0.92, GBP: 0.79, CAD: 1.36, MXN: 17.25, JPY: 149.50, CNY: 7.24, SGD: 1.34, HKD: 7.78, AUD: 1.52 },
    EUR: { USD: 1.09, GBP: 0.86, CAD: 1.48, MXN: 18.79, JPY: 162.76, CNY: 7.88, SGD: 1.46, HKD: 8.48, AUD: 1.66 },
    GBP: { USD: 1.27, EUR: 1.16, CAD: 1.72, MXN: 21.84, JPY: 189.30, CNY: 9.16, SGD: 1.70, HKD: 9.88, AUD: 1.93 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, MXN: 12.69, JPY: 110.07, CNY: 5.33, SGD: 0.99, HKD: 5.72, AUD: 1.12 },
    MXN: { USD: 0.058, EUR: 0.053, GBP: 0.046, CAD: 0.079, JPY: 8.67, CNY: 0.42, SGD: 0.078, HKD: 0.45, AUD: 0.088 },
    JPY: { USD: 0.0067, EUR: 0.0061, GBP: 0.0053, CAD: 0.0091, MXN: 0.115, CNY: 0.048, SGD: 0.0090, HKD: 0.052, AUD: 0.010 },
    CNY: { USD: 0.138, EUR: 0.127, GBP: 0.109, CAD: 0.188, MXN: 2.38, JPY: 20.83, SGD: 0.185, HKD: 1.07, AUD: 0.210 },
    SGD: { USD: 0.75, EUR: 0.68, GBP: 0.59, CAD: 1.01, MXN: 12.87, JPY: 111.57, CNY: 5.40, HKD: 5.81, AUD: 1.13 },
    HKD: { USD: 0.13, EUR: 0.12, GBP: 0.10, CAD: 0.17, MXN: 2.22, JPY: 19.21, CNY: 0.93, SGD: 0.17, AUD: 0.20 },
    AUD: { USD: 0.66, EUR: 0.60, GBP: 0.52, CAD: 0.89, MXN: 11.36, JPY: 98.68, CNY: 4.77, SGD: 0.88, HKD: 5.13 },
  };

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    { code: 'MXN', name: 'Mexican Peso', symbol: '$', flag: '🇲🇽' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
    { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  ];

  const convertedAmount = parseFloat(amount) * (exchangeRates[fromCurrency]?.[toCurrency] || 1);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const fromCurrencyData = currencies.find(c => c.code === fromCurrency);
  const toCurrencyData = currencies.find(c => c.code === toCurrency);

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Mini Profile Header */}
      <MiniProfileHeader />
      
      {/* Header */}
      <div className="bg-secondary text-secondary-foreground p-6 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-secondary-foreground hover:bg-secondary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-secondary-foreground">Currency Converter</h1>
        </div>
      </div>

      <div className="px-6 py-6 space-y-4">
        {/* Result Card */}
        <Card className="p-6 bg-gradient-to-br from-secondary to-secondary/90 text-secondary-foreground border-0 shadow-md">
          <div className="text-center">
            <p className="text-secondary-foreground/80 mb-2">Converted Amount</p>
            <h2 className="text-secondary-foreground mb-2">
              {toCurrencyData?.symbol}{convertedAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} {toCurrency}
            </h2>
            <p className="text-secondary-foreground/80">
              Exchange Rate: 1 {fromCurrency} = {exchangeRates[fromCurrency]?.[toCurrency]?.toFixed(4)} {toCurrency}
            </p>
          </div>
        </Card>

        {/* From Currency */}
        <Card className="p-6 space-y-4 border-border">
          <div>
            <label className="text-muted-foreground mb-2 block">From</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1"
                placeholder="Enter amount"
              />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <span className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSwap}
              className="rounded-full w-10 h-10 p-0"
            >
              <ArrowDownUp className="w-4 h-4" />
            </Button>
          </div>

          {/* To Currency */}
          <div>
            <label className="text-sm text-slate-600 mb-2 block">To</label>
            <div className="flex gap-2">
              <Input
                type="number"
                value={convertedAmount.toFixed(2)}
                readOnly
                className="flex-1 bg-slate-50"
              />
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      <span className="flex items-center gap-2">
                        <span>{currency.flag}</span>
                        <span>{currency.code}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Quick Conversions */}
        <Card className="p-6">
          <h3 className="text-slate-800 mb-4">Popular Conversions</h3>
          <div className="space-y-2">
            {[10000, 50000, 100000, 250000, 500000].map((amt) => (
              <div
                key={amt}
                className="flex justify-between items-center p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => setAmount(amt.toString())}
              >
                <span className="text-slate-700">
                  {fromCurrencyData?.symbol}{amt.toLocaleString()} {fromCurrency}
                </span>
                <span className="text-slate-900">
                  {toCurrencyData?.symbol}{(amt * (exchangeRates[fromCurrency]?.[toCurrency] || 1)).toLocaleString(undefined, {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })} {toCurrency}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Info */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-xs text-blue-800">
            💡 Exchange rates are updated regularly. Actual rates may vary based on market conditions and your financial institution.
          </p>
        </Card>
      </div>

      {/* Footer */}
      <CompanyFooter onShare={onShare} />
    </div>
  );
}
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Rate {
  label: string;
  value: string;
  change: number;
}

export function RatesDisplay() {
  const [rates, setRates] = useState<Rate[]>([
    { label: '5yr Treasury', value: '4.25', change: -0.05 },
    { label: '10yr Treasury', value: '4.45', change: 0.02 },
    { label: 'Prime', value: '8.50', change: 0.00 },
  ]);

  return (
    <div className="px-6">
      <div className="bg-card rounded-lg shadow-sm border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-foreground">US Treasuries</h2>
          <span className="text-muted-foreground">Last update</span>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {rates.map((rate, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-2">
                <span className="text-foreground">{rate.value}</span>
                {rate.change !== 0 && (
                  rate.change > 0 ? (
                    <TrendingUp className="w-3.5 h-3.5 text-destructive" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-accent" />
                  )
                )}
              </div>
              <p className="text-muted-foreground mb-1">{rate.label}</p>
              {rate.change !== 0 && (
                <p className={`${rate.change > 0 ? 'text-destructive' : 'text-accent'}`}>
                  {rate.change > 0 ? '+' : ''}{rate.change}%
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
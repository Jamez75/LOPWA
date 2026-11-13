import { useState } from 'react';
import { ArrowLeft, Home, Percent, Calendar, Building2, TrendingUp, Calculator, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { CompanyFooter } from './CompanyFooter';
import { MiniProfileHeader } from './MiniProfileHeader';

interface MortgageCalculatorProps {
  onBack: () => void;
  onShare: () => void;
}

type CalculatorType = 'selection' | 'purchase' | 'refinance' | 'dscr' | 'caprate';

export function MortgageCalculator({ onBack, onShare }: MortgageCalculatorProps) {
  const [calculatorType, setCalculatorType] = useState<CalculatorType>('selection');
  
  // Purchase Mortgage Calculator States
  const [loanAmount, setLoanAmount] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [annualPropertyTax, setAnnualPropertyTax] = useState(6000);
  const [annualInsurance, setAnnualInsurance] = useState(2500);

  // Refinance Calculator States
  const [currentLoanBalance, setCurrentLoanBalance] = useState(400000);
  const [currentInterestRate, setCurrentInterestRate] = useState(7.5);
  const [newInterestRate, setNewInterestRate] = useState(6.0);
  const [remainingTerm, setRemainingTerm] = useState(25);
  const [newLoanTerm, setNewLoanTerm] = useState(30);
  const [cashOutAmount, setCashOutAmount] = useState(0);
  const [refinancePropertyTax, setRefinancePropertyTax] = useState(6000);
  const [refinanceInsurance, setRefinanceInsurance] = useState(2500);
  const [closingCosts, setClosingCosts] = useState(5000);

  // DSCR Calculator States
  const [propertyPrice, setPropertyPrice] = useState(500000);
  const [dscrDownPayment, setDscrDownPayment] = useState(100000);
  const [dscrInterestRate, setDscrInterestRate] = useState(7.5);
  const [dscrLoanTerm, setDscrLoanTerm] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState(3500);
  const [monthlyExpenses, setMonthlyExpenses] = useState(800);

  // Cap Rate Calculator States
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [annualRent, setAnnualRent] = useState(42000);
  const [annualExpenses, setAnnualExpenses] = useState(9600);

  // Purchase Mortgage Calculations
  const principal = loanAmount - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  const monthlyPayment =
    (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  // Refinance Calculations
  const currentMonthlyRate = currentInterestRate / 100 / 12;
  const currentNumberOfPayments = remainingTerm * 12;
  const currentMonthlyPayment =
    (currentLoanBalance * (currentMonthlyRate * Math.pow(1 + currentMonthlyRate, currentNumberOfPayments))) /
    (Math.pow(1 + currentMonthlyRate, currentNumberOfPayments) - 1);
  const currentTotalPayment = currentMonthlyPayment * currentNumberOfPayments;
  const currentTotalInterest = currentTotalPayment - currentLoanBalance;

  const newPrincipal = currentLoanBalance - cashOutAmount;
  const newMonthlyRate = newInterestRate / 100 / 12;
  const newNumberOfPayments = newLoanTerm * 12;
  const newMonthlyPayment =
    (newPrincipal * (newMonthlyRate * Math.pow(1 + newMonthlyRate, newNumberOfPayments))) /
    (Math.pow(1 + newMonthlyRate, newNumberOfPayments) - 1);
  const newTotalPayment = newMonthlyPayment * newNumberOfPayments;
  const newTotalInterest = newTotalPayment - newPrincipal;

  const savings = currentTotalPayment - newTotalPayment - closingCosts;

  // DSCR Calculations
  const dscrPrincipal = propertyPrice - dscrDownPayment;
  const dscrMonthlyRate = dscrInterestRate / 100 / 12;
  const dscrNumberOfPayments = dscrLoanTerm * 12;
  const dscrMonthlyPayment =
    (dscrPrincipal * (dscrMonthlyRate * Math.pow(1 + dscrMonthlyRate, dscrNumberOfPayments))) /
    (Math.pow(1 + dscrMonthlyRate, dscrNumberOfPayments) - 1);
  const netOperatingIncome = monthlyRent - monthlyExpenses;
  const dscr = netOperatingIncome / dscrMonthlyPayment;

  // Cap Rate Calculations
  const netIncome = annualRent - annualExpenses;
  const capRate = (netIncome / purchasePrice) * 100;

  const renderSelection = () => (
    <div className="px-4 py-6 space-y-4">
      <p className="text-muted-foreground text-center mb-6">
        Choose the calculator that fits your needs
      </p>

      {/* Standard Mortgage Calculator */}
      <Card
        className="p-6 cursor-pointer hover:shadow-lg transition-all active:scale-98 border-border"
        onClick={() => setCalculatorType('purchase')}
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-md flex-shrink-0">
            <Home className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-2">Purchase Calculator</h3>
            <p className="text-sm text-muted-foreground">
              Calculate monthly payments for traditional home purchases with down payment, interest rate, and loan term.
            </p>
          </div>
        </div>
      </Card>

      {/* Refinance Calculator */}
      <Card
        className="p-6 cursor-pointer hover:shadow-lg transition-all active:scale-98 border-border"
        onClick={() => setCalculatorType('refinance')}
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-md flex-shrink-0">
            <RefreshCw className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-2">Refinance Calculator</h3>
            <p className="text-sm text-muted-foreground">
              Calculate savings from refinancing your current mortgage with a new interest rate and loan term.
            </p>
          </div>
        </div>
      </Card>

      {/* DSCR Calculator */}
      <Card
        className="p-6 cursor-pointer hover:shadow-lg transition-all active:scale-98 border-border"
        onClick={() => setCalculatorType('dscr')}
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-destructive flex items-center justify-center shadow-md flex-shrink-0">
            <Building2 className="w-7 h-7 text-destructive-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-2">DSCR Calculator</h3>
            <p className="text-sm text-muted-foreground">
              Calculate Debt Service Coverage Ratio for investment properties. Ideal for rental property loans.
            </p>
          </div>
        </div>
      </Card>

      {/* Cap Rate Calculator */}
      <Card
        className="p-6 cursor-pointer hover:shadow-lg transition-all active:scale-98 border-border"
        onClick={() => setCalculatorType('caprate')}
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center shadow-md flex-shrink-0">
            <TrendingUp className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-foreground mb-2">Cap Rate Calculator</h3>
            <p className="text-sm text-muted-foreground">
              Calculate Capitalization Rate to evaluate investment property returns and compare opportunities.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderStandardCalculator = () => (
    <div className="px-4 py-6 space-y-6">
      {/* Back to Selection */}
      <Button
        variant="ghost"
        onClick={() => setCalculatorType('selection')}
        className="mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Choose Different Calculator
      </Button>

      {/* Results Card */}
      <Card className="p-6 bg-primary text-primary-foreground border-0 shadow-lg">
        <div className="text-center">
          <p className="text-primary-foreground/80 mb-2">Monthly Payment</p>
          <h2 className="text-primary-foreground mb-4">${monthlyPayment.toFixed(2)}</h2>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
            <div>
              <p className="text-xs text-primary-foreground/80 mb-1">Total Interest</p>
              <p className="text-primary-foreground">${totalInterest.toFixed(0)}</p>
            </div>
            <div>
              <p className="text-xs text-primary-foreground/80 mb-1">Total Payment</p>
              <p className="text-primary-foreground">${totalPayment.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Input Card */}
      <Card className="p-6 space-y-6">
        {/* Property Price/Value */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Home className="w-4 h-4 text-primary" />
              Price/Value
            </Label>
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[loanAmount]}
            onValueChange={([value]) => setLoanAmount(value)}
            min={100000}
            max={5000000}
            step={10000}
            className="w-full"
          />
        </div>

        {/* Down Payment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Down Payment</Label>
            <Input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[downPayment]}
            onValueChange={([value]) => setDownPayment(value)}
            min={0}
            max={loanAmount * 0.5}
            step={5000}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            {((downPayment / loanAmount) * 100).toFixed(1)}% down • Loan Amount: ${(loanAmount - downPayment).toLocaleString()}
          </p>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Percent className="w-4 h-4 text-accent" />
              Interest Rate
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                step="0.1"
                className="w-20 h-8 text-right"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <Slider
            value={[interestRate]}
            onValueChange={([value]) => setInterestRate(value)}
            min={2}
            max={12}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Loan Term */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              Loan Term
            </Label>
            <span className="text-foreground">{loanTerm} years</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[15, 20, 30].map((term) => (
              <Button
                key={term}
                variant={loanTerm === term ? 'default' : 'outline'}
                onClick={() => setLoanTerm(term)}
                className="w-full"
              >
                {term}yr
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Breakdown Card */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4">Payment Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Principal & Interest</span>
            <span className="text-foreground">${monthlyPayment.toFixed(2)}</span>
          </div>
          
          {/* Property Tax Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground">Property Tax (Annual)</Label>
              <Input
                type="number"
                value={annualPropertyTax}
                onChange={(e) => setAnnualPropertyTax(Number(e.target.value))}
                className="w-28 h-8 text-right"
              />
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-xs text-muted-foreground">Monthly</span>
              <span className="text-foreground">${(annualPropertyTax / 12).toFixed(2)}</span>
            </div>
          </div>
          
          {/* Insurance Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground">Insurance (Annual)</Label>
              <Input
                type="number"
                value={annualInsurance}
                onChange={(e) => setAnnualInsurance(Number(e.target.value))}
                className="w-28 h-8 text-right"
              />
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-xs text-muted-foreground">Monthly</span>
              <span className="text-foreground">${(annualInsurance / 12).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t pt-3 mt-3 flex justify-between items-center">
            <span className="text-foreground">Total Monthly</span>
            <span className="text-foreground">
              ${(
                monthlyPayment +
                annualPropertyTax / 12 +
                annualInsurance / 12
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <Button className="w-full h-12 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md">
        Get Pre-Qualified
      </Button>
    </div>
  );

  const renderRefinanceCalculator = () => (
    <div className="px-4 py-6 space-y-6">
      {/* Back to Selection */}
      <Button
        variant="ghost"
        onClick={() => setCalculatorType('selection')}
        className="mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Choose Different Calculator
      </Button>

      {/* Refinance Results Card */}
      <Card className="p-6 bg-primary text-primary-foreground border-0 shadow-lg">
        <div className="text-center">
          <p className="text-primary-foreground/80 mb-2">New Monthly Payment</p>
          <h2 className="text-primary-foreground mb-4">${newMonthlyPayment.toFixed(2)}</h2>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
            <div>
              <p className="text-xs text-primary-foreground/80 mb-1">Current Payment</p>
              <p className="text-primary-foreground">${currentMonthlyPayment.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-primary-foreground/80 mb-1">Monthly Savings</p>
              <p className="text-primary-foreground">${(currentMonthlyPayment - newMonthlyPayment).toFixed(2)}</p>
            </div>
          </div>
          <div className="pt-3 mt-3 border-t border-primary-foreground/20">
            <p className="text-xs text-primary-foreground/80 mb-1">Lifetime Savings</p>
            <p className="text-primary-foreground text-xl">${savings.toFixed(0)}</p>
            <p className="text-xs text-primary-foreground/60 mt-1">After ${closingCosts.toFixed(0)} closing costs</p>
          </div>
        </div>
      </Card>

      {/* Current Loan Details */}
      <Card className="p-6 space-y-6">
        <h3 className="text-foreground mb-4">Current Loan Details</h3>
        
        {/* Current Loan Balance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Current Loan Balance</Label>
            <Input
              type="number"
              value={currentLoanBalance}
              onChange={(e) => setCurrentLoanBalance(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[currentLoanBalance]}
            onValueChange={([value]) => setCurrentLoanBalance(value)}
            min={0}
            max={5000000}
            step={10000}
            className="w-full"
          />
        </div>

        {/* Current Interest Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Current Interest Rate</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={currentInterestRate}
                onChange={(e) => setCurrentInterestRate(Number(e.target.value))}
                step="0.1"
                className="w-20 h-8 text-right"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <Slider
            value={[currentInterestRate]}
            onValueChange={([value]) => setCurrentInterestRate(value)}
            min={2}
            max={12}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Remaining Term */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Remaining Term</Label>
            <span className="text-foreground">{remainingTerm} years</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[15, 20, 30].map((term) => (
              <Button
                key={term}
                variant={remainingTerm === term ? 'default' : 'outline'}
                onClick={() => setRemainingTerm(term)}
                className="w-full"
              >
                {term}yr
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* New Loan Details */}
      <Card className="p-6 space-y-6">
        <h3 className="text-foreground mb-4">New Loan Details</h3>
        
        {/* New Interest Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>New Interest Rate</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={newInterestRate}
                onChange={(e) => setNewInterestRate(Number(e.target.value))}
                step="0.1"
                className="w-20 h-8 text-right"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <Slider
            value={[newInterestRate]}
            onValueChange={([value]) => setNewInterestRate(value)}
            min={2}
            max={12}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* New Loan Term */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>New Loan Term</Label>
            <span className="text-foreground">{newLoanTerm} years</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[15, 20, 30].map((term) => (
              <Button
                key={term}
                variant={newLoanTerm === term ? 'default' : 'outline'}
                onClick={() => setNewLoanTerm(term)}
                className="w-full"
              >
                {term}yr
              </Button>
            ))}
          </div>
        </div>

        {/* Cash Out Amount */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Cash Out Amount</Label>
            <Input
              type="number"
              value={cashOutAmount}
              onChange={(e) => setCashOutAmount(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[cashOutAmount]}
            onValueChange={([value]) => setCashOutAmount(value)}
            min={0}
            max={currentLoanBalance * 0.5}
            step={5000}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            {((cashOutAmount / currentLoanBalance) * 100).toFixed(1)}% cash out
          </p>
        </div>
      </Card>

      {/* Property Details */}
      <Card className="p-6 space-y-6">
        <h3 className="text-foreground mb-4">Property Details</h3>
        
        {/* Property Price */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Property Price</Label>
            <Input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[loanAmount]}
            onValueChange={([value]) => setLoanAmount(value)}
            min={100000}
            max={2000000}
            step={10000}
            className="w-full"
          />
        </div>

        {/* Down Payment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Down Payment</Label>
            <Input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[downPayment]}
            onValueChange={([value]) => setDownPayment(value)}
            min={0}
            max={loanAmount * 0.5}
            step={5000}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            {((downPayment / loanAmount) * 100).toFixed(1)}% down
          </p>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Interest Rate</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                step="0.1"
                className="w-20 h-8 text-right"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <Slider
            value={[interestRate]}
            onValueChange={([value]) => setInterestRate(value)}
            min={2}
            max={12}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Loan Term */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Loan Term</Label>
            <span className="text-foreground">{loanTerm} years</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[15, 20, 30].map((term) => (
              <Button
                key={term}
                variant={loanTerm === term ? 'default' : 'outline'}
                onClick={() => setLoanTerm(term)}
                className="w-full"
              >
                {term}yr
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Breakdown Card */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4">Payment Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Principal & Interest</span>
            <span className="text-foreground">${newMonthlyPayment.toFixed(2)}</span>
          </div>
          
          {/* Property Tax Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground">Property Tax (Annual)</Label>
              <Input
                type="number"
                value={refinancePropertyTax}
                onChange={(e) => setRefinancePropertyTax(Number(e.target.value))}
                className="w-28 h-8 text-right"
              />
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-xs text-muted-foreground">Monthly</span>
              <span className="text-foreground">${(refinancePropertyTax / 12).toFixed(2)}</span>
            </div>
          </div>
          
          {/* Insurance Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-muted-foreground">Insurance (Annual)</Label>
              <Input
                type="number"
                value={refinanceInsurance}
                onChange={(e) => setRefinanceInsurance(Number(e.target.value))}
                className="w-28 h-8 text-right"
              />
            </div>
            <div className="flex justify-between items-center pl-4">
              <span className="text-xs text-muted-foreground">Monthly</span>
              <span className="text-foreground">${(refinanceInsurance / 12).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="border-t pt-3 mt-3 flex justify-between items-center">
            <span className="text-foreground">Total Monthly</span>
            <span className="text-foreground">
              ${(
                newMonthlyPayment +
                refinancePropertyTax / 12 +
                refinanceInsurance / 12
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <Button className="w-full h-12 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md">
        Discuss Refinance Options
      </Button>
    </div>
  );

  const renderDSCRCalculator = () => (
    <div className="px-4 py-6 space-y-6">
      {/* Back to Selection */}
      <Button
        variant="ghost"
        onClick={() => setCalculatorType('selection')}
        className="mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Choose Different Calculator
      </Button>

      {/* DSCR Results Card */}
      <Card className="p-6 bg-destructive text-destructive-foreground border-0 shadow-lg">
        <div className="text-center">
          <p className="text-destructive-foreground/80 mb-2">Debt Service Coverage Ratio</p>
          <h2 className="text-destructive-foreground mb-2">{dscr.toFixed(2)}</h2>
          <p className="text-xs text-destructive-foreground/70 mb-4">
            {dscr >= 1.25 ? '✓ Strong DSCR' : dscr >= 1.0 ? '⚠ Acceptable DSCR' : '✗ Low DSCR'}
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-destructive-foreground/20">
            <div>
              <p className="text-xs text-destructive-foreground/70 mb-1">Monthly Payment</p>
              <p className="text-destructive-foreground">${dscrMonthlyPayment.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-destructive-foreground/70 mb-1">Net Operating Income</p>
              <p className="text-destructive-foreground">${netOperatingIncome.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Property Details */}
      <Card className="p-6 space-y-6">
        <h3 className="text-foreground mb-4">Property Details</h3>
        
        {/* Property Price */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Property Price</Label>
            <Input
              type="number"
              value={propertyPrice}
              onChange={(e) => setPropertyPrice(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[propertyPrice]}
            onValueChange={([value]) => setPropertyPrice(value)}
            min={100000}
            max={5000000}
            step={10000}
            className="w-full"
          />
        </div>

        {/* Down Payment */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Down Payment</Label>
            <Input
              type="number"
              value={dscrDownPayment}
              onChange={(e) => setDscrDownPayment(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[dscrDownPayment]}
            onValueChange={([value]) => setDscrDownPayment(value)}
            min={0}
            max={propertyPrice * 0.5}
            step={5000}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            {((dscrDownPayment / propertyPrice) * 100).toFixed(1)}% down
          </p>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Interest Rate</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={dscrInterestRate}
                onChange={(e) => setDscrInterestRate(Number(e.target.value))}
                step="0.1"
                className="w-20 h-8 text-right"
              />
              <span className="text-sm text-muted-foreground">%</span>
            </div>
          </div>
          <Slider
            value={[dscrInterestRate]}
            onValueChange={([value]) => setDscrInterestRate(value)}
            min={2}
            max={12}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Loan Term */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Loan Term</Label>
            <span className="text-foreground">{dscrLoanTerm} years</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[15, 20, 30].map((term) => (
              <Button
                key={term}
                variant={dscrLoanTerm === term ? 'default' : 'outline'}
                onClick={() => setDscrLoanTerm(term)}
                className="w-full"
              >
                {term}yr
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {/* Income & Expenses */}
      <Card className="p-6 space-y-6">
        <h3 className="text-foreground mb-4">Income & Expenses</h3>
        
        {/* Monthly Rent */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Monthly Rent</Label>
            <Input
              type="number"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[monthlyRent]}
            onValueChange={([value]) => setMonthlyRent(value)}
            min={500}
            max={10000}
            step={100}
            className="w-full"
          />
        </div>

        {/* Monthly Expenses */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Monthly Expenses</Label>
            <Input
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[monthlyExpenses]}
            onValueChange={([value]) => setMonthlyExpenses(value)}
            min={0}
            max={5000}
            step={50}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Includes taxes, insurance, HOA, maintenance
          </p>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-4 bg-primary/5 border-primary/20">
        <p className="text-sm text-foreground">
          <strong>DSCR Guideline:</strong> Most lenders require a minimum DSCR of 1.25, meaning the property's income should be 125% of the debt payment.
        </p>
      </Card>

      {/* CTA */}
      <Button className="w-full h-12 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md">
        Discuss DSCR Loan Options
      </Button>
    </div>
  );

  const renderCapRateCalculator = () => (
    <div className="px-4 py-6 space-y-6">
      {/* Back to Selection */}
      <Button
        variant="ghost"
        onClick={() => setCalculatorType('selection')}
        className="mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Choose Different Calculator
      </Button>

      {/* Cap Rate Results Card */}
      <Card className="p-6 bg-accent text-primary-foreground border-0 shadow-lg">
        <div className="text-center">
          <p className="text-primary-foreground/80 mb-2">Capitalization Rate</p>
          <h2 className="text-primary-foreground mb-2">{capRate.toFixed(2)}%</h2>
          <p className="text-xs text-primary-foreground/70 mb-4">
            {capRate >= 8 ? '✓ Excellent Return' : capRate >= 5 ? '⚠ Good Return' : '✗ Low Return'}
          </p>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-primary-foreground/20">
            <div>
              <p className="text-xs text-primary-foreground/70 mb-1">Annual Income</p>
              <p className="text-primary-foreground">${annualRent.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-primary-foreground/70 mb-1">Net Operating Income</p>
              <p className="text-primary-foreground">${netIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Purchase Details */}
      <Card className="p-6 space-y-6">
        <h3 className="text-foreground mb-4">Purchase Details</h3>
        
        {/* Purchase Price */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Purchase Price</Label>
            <Input
              type="number"
              value={purchasePrice}
              onChange={(e) => setPurchasePrice(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[purchasePrice]}
            onValueChange={([value]) => setPurchasePrice(value)}
            min={100000}
            max={5000000}
            step={10000}
            className="w-full"
          />
        </div>
      </Card>

      {/* Income & Expenses */}
      <Card className="p-6 space-y-6">
        <h3 className="text-foreground mb-4">Annual Income & Expenses</h3>
        
        {/* Annual Rent */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Annual Rental Income</Label>
            <Input
              type="number"
              value={annualRent}
              onChange={(e) => setAnnualRent(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[annualRent]}
            onValueChange={([value]) => setAnnualRent(value)}
            min={6000}
            max={120000}
            step={1000}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            ${(annualRent / 12).toFixed(2)} per month
          </p>
        </div>

        {/* Annual Expenses */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Annual Operating Expenses</Label>
            <Input
              type="number"
              value={annualExpenses}
              onChange={(e) => setAnnualExpenses(Number(e.target.value))}
              className="w-32 h-8 text-right"
            />
          </div>
          <Slider
            value={[annualExpenses]}
            onValueChange={([value]) => setAnnualExpenses(value)}
            min={0}
            max={60000}
            step={500}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            ${(annualExpenses / 12).toFixed(2)} per month (taxes, insurance, maintenance, HOA)
          </p>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="p-4 bg-accent/10 border-accent/30">
        <p className="text-sm text-foreground">
          <strong>Cap Rate Guide:</strong> A higher cap rate indicates better potential returns. Typical ranges: 4-6% (low risk), 7-10% (moderate), 10%+ (higher risk/return).
        </p>
      </Card>

      {/* CTA */}
      <Button className="w-full h-12 bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md">
        Explore Investment Financing
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Mini Profile Header */}
      <MiniProfileHeader />
      
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/10"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1>
            {calculatorType === 'selection' && 'Mortgage Calculators'}
            {calculatorType === 'purchase' && 'Standard Mortgage'}
            {calculatorType === 'refinance' && 'Refinance Calculator'}
            {calculatorType === 'dscr' && 'DSCR Calculator'}
            {calculatorType === 'caprate' && 'Cap Rate Calculator'}
          </h1>
        </div>
      </div>

      {calculatorType === 'selection' && renderSelection()}
      {calculatorType === 'purchase' && renderStandardCalculator()}
      {calculatorType === 'refinance' && renderRefinanceCalculator()}
      {calculatorType === 'dscr' && renderDSCRCalculator()}
      {calculatorType === 'caprate' && renderCapRateCalculator()}

      {/* Footer */}
      <CompanyFooter onShare={onShare} />
    </div>
  );
}
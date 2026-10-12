/**
 * FinSavvy Core Financial Mathematics Engine
 * Rigorous, auditable formulas based on CFPB and Federal Reserve financial standards.
 */

// Format currency
export function formatCurrency(amount: number, decimals: number = 0): string {
  if (isNaN(amount) || !isFinite(amount)) return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  }).format(amount);
}

// Format percent
export function formatPercent(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
}

// -------------------------------------------------------------
// 1. COMPOUND INTEREST CALCULATION
// -------------------------------------------------------------
export interface CompoundInterestInput {
  initialPrincipal: number;
  monthlyContribution: number;
  annualInterestRate: number; // in percent e.g. 8 for 8%
  timeHorizonYears: number;
  compoundingFrequency: 1 | 4 | 12 | 365; // annual, quarterly, monthly, daily
  annualInflationRate: number; // in percent e.g. 2.5%
}

export interface CompoundYearData {
  year: number;
  totalSavings: number;
  totalContributions: number;
  totalInterest: number;
  realPurchasingPower: number; // Inflation adjusted
}

export interface CompoundInterestResult {
  endBalance: number;
  totalPrincipalContributed: number;
  totalInterestEarned: number;
  inflationAdjustedBalance: number;
  yearlyBreakdown: CompoundYearData[];
}

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestResult {
  const {
    initialPrincipal,
    monthlyContribution,
    annualInterestRate,
    timeHorizonYears,
    compoundingFrequency,
    annualInflationRate,
  } = input;

  const r = annualInterestRate / 100;
  const n = compoundingFrequency;
  const i = annualInflationRate / 100;

  const yearlyBreakdown: CompoundYearData[] = [];
  let currentBalance = initialPrincipal;
  let cumulativeContributions = initialPrincipal;

  for (let year = 1; year <= timeHorizonYears; year++) {
    // 12 months in a year
    for (let month = 1; month <= 12; month++) {
      currentBalance += monthlyContribution;
      cumulativeContributions += monthlyContribution;
      
      // Interest added monthly equivalent based on compounding frequency
      const monthlyRate = Math.pow(1 + r / n, n / 12) - 1;
      currentBalance += currentBalance * monthlyRate;
    }

    const totalInterest = Math.max(0, currentBalance - cumulativeContributions);
    // Purchasing power: Balance / (1 + i)^t
    const realPurchasingPower = currentBalance / Math.pow(1 + i, year);

    yearlyBreakdown.push({
      year,
      totalSavings: Math.round(currentBalance),
      totalContributions: Math.round(cumulativeContributions),
      totalInterest: Math.round(totalInterest),
      realPurchasingPower: Math.round(realPurchasingPower),
    });
  }

  const endBalance = Math.round(currentBalance);
  const totalPrincipalContributed = Math.round(cumulativeContributions);
  const totalInterestEarned = Math.round(endBalance - totalPrincipalContributed);
  const inflationAdjustedBalance = Math.round(
    endBalance / Math.pow(1 + i, timeHorizonYears)
  );

  return {
    endBalance,
    totalPrincipalContributed,
    totalInterestEarned,
    inflationAdjustedBalance,
    yearlyBreakdown,
  };
}

// -------------------------------------------------------------
// 2. FIRE (FINANCIAL INDEPENDENCE, RETIRE EARLY) CALCULATION
// -------------------------------------------------------------
export interface FireInput {
  currentAge: number;
  currentNetWorth: number;
  annualExpenditure: number;
  monthlySavings: number;
  annualReturnRate: number; // e.g. 7%
  safeWithdrawalRate: number; // e.g. 4%
  inflationRate: number; // e.g. 2.5%
}

export interface FireResult {
  fireTargetNumber: number;
  leanFireNumber: number; // 75% expenditure
  fatFireNumber: number; // 125% expenditure
  coastFireNumber: number; // Net worth needed today to hit FIRE by 60 without further savings
  yearsToFire: number;
  projectedFireAge: number;
  isAlreadyFire: boolean;
  yearlyProjection: {
    age: number;
    year: number;
    portfolioValue: number;
    fireTarget: number;
  }[];
}

export function calculateFire(input: FireInput): FireResult {
  const {
    currentAge,
    currentNetWorth,
    annualExpenditure,
    monthlySavings,
    annualReturnRate,
    safeWithdrawalRate,
    inflationRate,
  } = input;

  // Real return rate (Fisher effect approx or exact: (1+r)/(1+i) - 1)
  const realReturnRate = (1 + annualReturnRate / 100) / (1 + inflationRate / 100) - 1;
  const swr = safeWithdrawalRate / 100;

  const fireTargetNumber = Math.round(annualExpenditure / swr);
  const leanFireNumber = Math.round((annualExpenditure * 0.75) / swr);
  const fatFireNumber = Math.round((annualExpenditure * 1.25) / swr);

  // Coast FIRE: target at age 65 discounted back to current age at real return rate
  const yearsToTraditionalRetirement = Math.max(1, 65 - currentAge);
  const coastFireNumber = Math.round(
    fireTargetNumber / Math.pow(1 + realReturnRate, yearsToTraditionalRetirement)
  );

  const yearlyProjection = [];
  let portfolio = currentNetWorth;
  let yearsCount = 0;
  const maxYears = 60;
  let reachedFireYear = -1;

  if (portfolio >= fireTargetNumber) {
    reachedFireYear = 0;
  }

  yearlyProjection.push({
    age: currentAge,
    year: 0,
    portfolioValue: Math.round(portfolio),
    fireTarget: fireTargetNumber,
  });

  while (yearsCount < maxYears) {
    yearsCount++;
    // Add annual savings + compounding
    portfolio = (portfolio + monthlySavings * 12) * (1 + realReturnRate);

    yearlyProjection.push({
      age: currentAge + yearsCount,
      year: yearsCount,
      portfolioValue: Math.round(portfolio),
      fireTarget: fireTargetNumber,
    });

    if (reachedFireYear === -1 && portfolio >= fireTargetNumber) {
      reachedFireYear = yearsCount;
    }
  }

  const finalYearsToFire = reachedFireYear === -1 ? maxYears : reachedFireYear;

  return {
    fireTargetNumber,
    leanFireNumber,
    fatFireNumber,
    coastFireNumber,
    yearsToFire: finalYearsToFire,
    projectedFireAge: currentAge + finalYearsToFire,
    isAlreadyFire: currentNetWorth >= fireTargetNumber,
    yearlyProjection: yearlyProjection.slice(0, Math.min(35, maxYears)),
  };
}

// -------------------------------------------------------------
// 3. DEBT SNOWBALL VS. AVALANCHE OPTIMIZER
// -------------------------------------------------------------
export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  apr: number; // e.g. 19.99%
  minimumPayment: number;
}

export interface DebtMethodResult {
  methodName: 'Snowball' | 'Avalanche';
  monthsToDebtFree: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  totalPaid: number;
  monthlyHistory: {
    month: number;
    remainingBalance: number;
    debtsRemaining: number;
  }[];
}

export function calculateDebtPayoff(
  debts: DebtItem[],
  extraMonthlyBudget: number
): {
  snowball: DebtMethodResult;
  avalanche: DebtMethodResult;
  interestSavedByAvalanche: number;
  monthsSavedByAvalanche: number;
} {
  function simulate(orderStrategy: 'snowball' | 'avalanche'): DebtMethodResult {
    // Clone debts
    let activeDebts = debts.map((d) => ({ ...d, currentBalance: d.balance }));
    let month = 0;
    let totalInterest = 0;
    let totalPrincipal = 0;
    const history: { month: number; remainingBalance: number; debtsRemaining: number }[] = [];

    const maxMonths = 360; // 30 year safety cap

    while (activeDebts.some((d) => d.currentBalance > 0.01) && month < maxMonths) {
      month++;
      let extraAvailable = extraMonthlyBudget;

      // Accrue monthly interest on all active debts
      for (const d of activeDebts) {
        if (d.currentBalance > 0) {
          const monthlyRate = d.apr / 100 / 12;
          const interestCharge = d.currentBalance * monthlyRate;
          d.currentBalance += interestCharge;
          totalInterest += interestCharge;
        }
      }

      // First pay minimum payments
      for (const d of activeDebts) {
        if (d.currentBalance > 0) {
          const minPay = Math.min(d.minimumPayment, d.currentBalance);
          d.currentBalance -= minPay;
          totalPrincipal += minPay;
        }
      }

      // Sort priority debts
      if (orderStrategy === 'snowball') {
        // Lowest balance first
        activeDebts.sort((a, b) => a.currentBalance - b.currentBalance);
      } else {
        // Highest APR first
        activeDebts.sort((a, b) => b.apr - a.apr);
      }

      // Apply extra payment to top priority active debt
      for (const d of activeDebts) {
        if (d.currentBalance > 0 && extraAvailable > 0) {
          const extraPay = Math.min(extraAvailable, d.currentBalance);
          d.currentBalance -= extraPay;
          totalPrincipal += extraPay;
          extraAvailable -= extraPay;
        }
      }

      const totalRemaining = activeDebts.reduce((sum, d) => sum + Math.max(0, d.currentBalance), 0);
      const remainingCount = activeDebts.filter((d) => d.currentBalance > 0.01).length;

      if (month % 3 === 0 || totalRemaining < 1 || month === 1) {
        history.push({
          month,
          remainingBalance: Math.round(totalRemaining),
          debtsRemaining: remainingCount,
        });
      }
    }

    const totalPrincipalOrig = debts.reduce((s, d) => s + d.balance, 0);

    return {
      methodName: orderStrategy === 'snowball' ? 'Snowball' : 'Avalanche',
      monthsToDebtFree: month,
      totalInterestPaid: Math.round(totalInterest),
      totalPrincipalPaid: Math.round(totalPrincipalOrig),
      totalPaid: Math.round(totalPrincipalOrig + totalInterest),
      monthlyHistory: history,
    };
  }

  const snowball = simulate('snowball');
  const avalanche = simulate('avalanche');

  return {
    snowball,
    avalanche,
    interestSavedByAvalanche: Math.max(0, snowball.totalInterestPaid - avalanche.totalInterestPaid),
    monthsSavedByAvalanche: Math.max(0, snowball.monthsToDebtFree - avalanche.monthsToDebtFree),
  };
}

// -------------------------------------------------------------
// 4. MORTGAGE & ACCELERATED AMORTIZATION
// -------------------------------------------------------------
export interface MortgageInput {
  homePrice: number;
  downPayment: number;
  loanTermYears: 15 | 20 | 30;
  interestRate: number; // e.g. 6.5%
  propertyTaxAnnual: number;
  homeInsuranceAnnual: number;
  extraMonthlyPayment: number;
}

export interface AmortizationYearRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export interface MortgageResult {
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyTaxesAndInsurance: number;
  totalMonthlyPayment: number;
  standardTotalInterest: number;
  acceleratedTotalInterest: number;
  interestSaved: number;
  yearsShavedOff: number;
  acceleratedPayoffMonths: number;
  standardPayoffMonths: number;
  schedule: AmortizationYearRow[];
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const {
    homePrice,
    downPayment,
    loanTermYears,
    interestRate,
    propertyTaxAnnual,
    homeInsuranceAnnual,
    extraMonthlyPayment,
  } = input;

  const loanAmount = Math.max(0, homePrice - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  // Monthly P&I formula: M = P * [ i(1+i)^n ] / [ (1+i)^n - 1 ]
  let monthlyPI = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    monthlyPI =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  } else {
    monthlyPI = loanAmount / (totalMonths || 1);
  }

  const monthlyTaxesAndInsurance = (propertyTaxAnnual + homeInsuranceAnnual) / 12;
  const totalMonthlyPayment = monthlyPI + monthlyTaxesAndInsurance + extraMonthlyPayment;

  // Standard scenario
  const standardTotalInterest = Math.max(0, monthlyPI * totalMonths - loanAmount);

  // Accelerated amortization
  let balance = loanAmount;
  let accMonths = 0;
  let accInterestPaid = 0;
  const schedule: AmortizationYearRow[] = [];
  let currentYearPrincipal = 0;
  let currentYearInterest = 0;

  while (balance > 0.01 && accMonths < totalMonths) {
    accMonths++;
    const interest = balance * monthlyRate;
    let principal = monthlyPI - interest + extraMonthlyPayment;

    if (principal > balance) {
      principal = balance;
    }

    balance -= principal;
    accInterestPaid += interest;
    currentYearPrincipal += principal;
    currentYearInterest += interest;

    if (accMonths % 12 === 0 || balance <= 0.01) {
      const year = Math.ceil(accMonths / 12);
      schedule.push({
        year,
        principalPaid: Math.round(currentYearPrincipal),
        interestPaid: Math.round(currentYearInterest),
        remainingBalance: Math.max(0, Math.round(balance)),
      });
      currentYearPrincipal = 0;
      currentYearInterest = 0;
    }
  }

  const interestSaved = Math.max(0, standardTotalInterest - accInterestPaid);
  const monthsSaved = totalMonths - accMonths;
  const yearsShavedOff = Number((monthsSaved / 12).toFixed(1));

  return {
    loanAmount: Math.round(loanAmount),
    monthlyPrincipalAndInterest: Math.round(monthlyPI),
    monthlyTaxesAndInsurance: Math.round(monthlyTaxesAndInsurance),
    totalMonthlyPayment: Math.round(totalMonthlyPayment),
    standardTotalInterest: Math.round(standardTotalInterest),
    acceleratedTotalInterest: Math.round(accInterestPaid),
    interestSaved: Math.round(interestSaved),
    yearsShavedOff,
    acceleratedPayoffMonths: accMonths,
    standardPayoffMonths: totalMonths,
    schedule,
  };
}

// -------------------------------------------------------------
// 5. 50/30/20 BUDGET & CASHFLOW ALLOCATOR
// -------------------------------------------------------------
export interface BudgetInput {
  monthlyNetIncome: number;
  needsRatio: number; // e.g. 50
  wantsRatio: number; // e.g. 30
  savingsRatio: number; // e.g. 20
}

export interface BudgetResult {
  needsAmount: number;
  wantsAmount: number;
  savingsAmount: number;
  annualSavingsPotential: number;
  tenYearCompoundSavings: number; // at 7% return
  recommendedAllocations: {
    category: string;
    type: 'needs' | 'wants' | 'savings';
    idealRange: string;
    amount: number;
  }[];
}

export function calculateBudget(input: BudgetInput): BudgetResult {
  const { monthlyNetIncome, needsRatio, wantsRatio, savingsRatio } = input;

  const needsAmount = Math.round((monthlyNetIncome * needsRatio) / 100);
  const wantsAmount = Math.round((monthlyNetIncome * wantsRatio) / 100);
  const savingsAmount = Math.round((monthlyNetIncome * savingsRatio) / 100);

  const annualSavingsPotential = savingsAmount * 12;

  // 10-year compound value assuming 7% annual return
  let compound10 = 0;
  for (let m = 0; m < 120; m++) {
    compound10 = (compound10 + savingsAmount) * (1 + 0.07 / 12);
  }

  const recommendedAllocations = [
    { category: 'Housing & Rent', type: 'needs' as const, idealRange: '25-30%', amount: Math.round(monthlyNetIncome * 0.28) },
    { category: 'Groceries & Nutrition', type: 'needs' as const, idealRange: '10-12%', amount: Math.round(monthlyNetIncome * 0.10) },
    { category: 'Utilities & Telecom', type: 'needs' as const, idealRange: '5-8%', amount: Math.round(monthlyNetIncome * 0.06) },
    { category: 'Transportation & Insurance', type: 'needs' as const, idealRange: '6-10%', amount: Math.round(monthlyNetIncome * 0.06) },
    { category: 'Dining Out & Entertainment', type: 'wants' as const, idealRange: '10-15%', amount: Math.round(monthlyNetIncome * 0.15) },
    { category: 'Shopping & Hobbies', type: 'wants' as const, idealRange: '10-15%', amount: Math.round(monthlyNetIncome * 0.15) },
    { category: 'Retirement & Investments', type: 'savings' as const, idealRange: '15-20%', amount: Math.round(monthlyNetIncome * 0.15) },
    { category: 'Emergency Cushion / Debt', type: 'savings' as const, idealRange: '5-10%', amount: Math.round(monthlyNetIncome * 0.05) },
  ];

  return {
    needsAmount,
    wantsAmount,
    savingsAmount,
    annualSavingsPotential,
    tenYearCompoundSavings: Math.round(compound10),
    recommendedAllocations,
  };
}

// -------------------------------------------------------------
// 6. EMERGENCY FUND & RUNWAY RESILIENCE
// -------------------------------------------------------------
export interface EmergencyFundInput {
  housing: number;
  utilities: number;
  food: number;
  debtPayments: number;
  insuranceAndHealth: number;
  miscellaneousEssential: number;
  currentSavings: number;
  incomeStability: 'high' | 'medium' | 'freelance'; // 3 mo, 6 mo, 9-12 mo
  hysaApy: number; // e.g. 4.5%
}

export interface EmergencyFundResult {
  monthlyEssentials: number;
  recommendedMonths: number;
  targetFundAmount: number;
  currentFundingPercent: number;
  shortfallOrSurplus: number;
  currentRunwayMonths: number;
  annualInterestEarnedOnFund: number;
  statusText: string;
}

export function calculateEmergencyFund(input: EmergencyFundInput): EmergencyFundResult {
  const {
    housing,
    utilities,
    food,
    debtPayments,
    insuranceAndHealth,
    miscellaneousEssential,
    currentSavings,
    incomeStability,
    hysaApy,
  } = input;

  const monthlyEssentials =
    housing + utilities + food + debtPayments + insuranceAndHealth + miscellaneousEssential;

  let recommendedMonths = 6;
  if (incomeStability === 'high') recommendedMonths = 3;
  if (incomeStability === 'medium') recommendedMonths = 6;
  if (incomeStability === 'freelance') recommendedMonths = 9;

  const targetFundAmount = monthlyEssentials * recommendedMonths;
  const currentFundingPercent = Math.min(
    100,
    Math.round((currentSavings / (targetFundAmount || 1)) * 100)
  );

  const shortfallOrSurplus = currentSavings - targetFundAmount;
  const currentRunwayMonths = Number(
    (currentSavings / (monthlyEssentials || 1)).toFixed(1)
  );
  const annualInterestEarnedOnFund = Math.round(
    targetFundAmount * (hysaApy / 100)
  );

  let statusText = 'Adequate Cushion';
  if (currentFundingPercent < 40) statusText = 'High Vulnerability';
  else if (currentFundingPercent < 80) statusText = 'Growing Buffer';
  else if (currentFundingPercent >= 100) statusText = 'Fully Fortified';

  return {
    monthlyEssentials,
    recommendedMonths,
    targetFundAmount,
    currentFundingPercent,
    shortfallOrSurplus,
    currentRunwayMonths,
    annualInterestEarnedOnFund,
    statusText,
  };
}

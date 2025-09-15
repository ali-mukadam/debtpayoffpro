// src/utils/calculations.ts

export interface Debt {
  id: string;
  balance: number;
  interestRate: number; // Annual percentage rate (APR)
  minimumPayment: number;
}

export interface PaymentScenario {
  month: number;
  remainingBalance: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  interestThisMonth: number;
  principalThisMonth: number;
}

export enum PayoffStrategy {
  AVALANCHE = 'AVALANCHE', // Highest interest rate first
  SNOWBALL = 'SNOWBALL'   // Smallest balance first
}

export function calculatePayoff(debts: Debt[], strategy: PayoffStrategy, extraPayment: number = 0): PaymentScenario[] {
  // Create a working copy
  const accounts = debts.map(debt => ({
    ...debt,
    remainingBalance: debt.balance,
    paidInterest: 0,
    paidPrincipal: 0
  }));

  const scenarios: PaymentScenario[] = [];
  let totalInterestPaid = 0;
  let totalAmountPaid = 0;
  let month = 0;

  // Continue until all debts are paid off
  while (accounts.length > 0) {
    month++;
    let monthlyInterest = 0;
    let monthlyPrincipal = 0;

    // 1. STRATEGY: Find the target debt for the extra payment for THIS MONTH.
    let targetDebtIndex: number = -1;

    if (strategy === PayoffStrategy.AVALANCHE) {
      // Find the index of the account with the highest interest rate
      let highestRate = -1;
      accounts.forEach((acc, index) => {
        if (acc.remainingBalance > 0 && acc.interestRate > highestRate) {
          highestRate = acc.interestRate;
          targetDebtIndex = index;
        }
      });
    } else { // SNOWBALL
      // Find the index of the account with the smallest balance
      let smallestBalance = Infinity;
      accounts.forEach((acc, index) => {
        if (acc.remainingBalance > 0 && acc.remainingBalance < smallestBalance) {
          smallestBalance = acc.remainingBalance;
          targetDebtIndex = index;
        }
      });
    }

    // 2. PROCESS PAYMENTS for each remaining account
    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];
      if (account.remainingBalance <= 0) continue;

      const monthlyRate = account.interestRate / 100 / 12;
      const interestThisMonth = account.remainingBalance * monthlyRate;
      monthlyInterest += interestThisMonth;

      // Determine the total payment for this specific debt
      let totalPaymentForThisDebt;
      if (i === targetDebtIndex) {
        // This is the target debt: pay minimum + extra
        totalPaymentForThisDebt = account.minimumPayment + extraPayment;
      } else {
        // This is a non-target debt: pay only the minimum
        totalPaymentForThisDebt = account.minimumPayment;
      }

      // Ensure we don't pay more than the total owed (balance + accrued interest)
      const maxAllowedPayment = account.remainingBalance + interestThisMonth;
      if (totalPaymentForThisDebt > maxAllowedPayment) {
        totalPaymentForThisDebt = maxAllowedPayment;
      }

      // Calculate how much of the payment goes to the principal
      const principalThisMonth = totalPaymentForThisDebt - interestThisMonth;
      monthlyPrincipal += principalThisMonth;

      // Update the account state
      account.remainingBalance -= principalThisMonth;
      account.paidInterest += interestThisMonth;
      account.paidPrincipal += principalThisMonth;
    }

    // 3. UPDATE GLOBAL TOTALS
    totalInterestPaid += monthlyInterest;
    totalAmountPaid += monthlyInterest + monthlyPrincipal;

    // 4. RECORD THE SCENARIO FOR THIS MONTH
    scenarios.push({
      month,
      remainingBalance: accounts.reduce((sum, acc) => sum + acc.remainingBalance, 0),
      totalInterestPaid,
      totalAmountPaid,
      interestThisMonth: monthlyInterest,
      principalThisMonth: monthlyPrincipal
    });

    // 5. CLEANUP: Remove fully paid debts from the array
    for (let i = accounts.length - 1; i >= 0; i--) {
      if (accounts[i].remainingBalance <= 0) {
        accounts.splice(i, 1);
      }
    }

    // 6. SAFETY CHECK: Prevent infinite loop
    if (month > 600) {
      console.error("Calculation exceeded 600 months. Breaking loop.");
      break;
    }
  }

  return scenarios;
}

// Helper function to calculate total debt
export function calculateTotalDebt(debts: Debt[]): number {
  return debts.reduce((total, debt) => total + debt.balance, 0);
}

// Helper function to calculate total minimum payment
export function calculateTotalMinimumPayment(debts: Debt[]): number {
  return debts.reduce((total, debt) => total + debt.minimumPayment, 0);
}

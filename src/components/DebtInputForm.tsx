// src/components/DebtInputForm.tsx
'use client';

import { useState, useCallback, useMemo } from 'react';
import { Debt, PayoffStrategy } from '@/utils/calculations';

interface DebtInputFormProps {
  onCalculate: (debts: Debt[], strategy: PayoffStrategy, extraPayment: number) => void;
}

export default function DebtInputForm({ onCalculate }: DebtInputFormProps) {
  // FIX C: Counter for unique IDs instead of Date.now()
  const [nextId, setNextId] = useState<number>(2);
  
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', balance: 0, interestRate: 0, minimumPayment: 0 }
  ]);

  const [strategy, setStrategy] = useState<PayoffStrategy>(PayoffStrategy.AVALANCHE);
  // FIX B: Keep extra payment as string until submission
  const [extraPaymentStr, setExtraPaymentStr] = useState<string>('');

  // FIX A: Validation logic for empty debts
  const validDebts = useMemo(() => {
    return debts.filter(debt => 
      debt.balance > 0 && 
      debt.interestRate > 0 && 
      debt.minimumPayment > 0
    );
  }, [debts]);

  const hasValidDebts = validDebts.length > 0;

  // FIX C: Use incremental counter for unique IDs
  const addDebt = useCallback(() => {
    setDebts(prev => [...prev, { 
      id: nextId.toString(), 
      balance: 0, 
      interestRate: 0, 
      minimumPayment: 0 
    }]);
    setNextId(prev => prev + 1);
  }, [nextId]);

  const removeDebt = useCallback((id: string) => {
    if (debts.length > 1) {
      setDebts(prev => prev.filter(debt => debt.id !== id));
    }
  }, [debts.length]);

  const updateDebt = useCallback((id: string, field: keyof Debt, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return; // Prevent NaN and negative values
    
    setDebts(prev => prev.map(debt => 
      debt.id === id ? { ...debt, [field]: numValue } : debt
    ));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // FIX A: Clear validation with user feedback
    if (!hasValidDebts) {
      alert('Please enter at least one debt with valid balance, APR, and minimum payment.');
      return;
    }
    
    // FIX B: Parse extra payment only on submission
    const extraPayment = parseFloat(extraPaymentStr) || 0;
    onCalculate(validDebts, strategy, extraPayment);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800 font-inter">Enter Your Credit Card Debts</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Debt Input Fields with visual feedback */}
        {debts.map((debt, index) => {
          const isEmpty = debt.balance <= 0 || debt.interestRate <= 0 || debt.minimumPayment <= 0;
          
          return (
            <div key={debt.id} className={`border p-3 rounded-lg space-y-2 ${isEmpty ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}`}>
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-700 font-inter">Debt #{index + 1}</h3>
                {debts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeDebt(debt.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs font-inter"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">
                    Balance ($)
                  </label>
                  <input
                    type="number"
                    value={debt.balance || ''}
                    onChange={(e) => updateDebt(debt.id, 'balance', e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-900 placeholder-gray-400 text-sm font-inter"
                    placeholder="5000"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">
                    APR (%)
                  </label>
                  <input
                    type="number"
                    value={debt.interestRate || ''}
                    onChange={(e) => updateDebt(debt.id, 'interestRate', e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-900 placeholder-gray-400 text-sm font-inter"
                    placeholder="19.99"
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">
                    Min. Payment ($)
                  </label>
                  <input
                    type="number"
                    value={debt.minimumPayment || ''}
                    onChange={(e) => updateDebt(debt.id, 'minimumPayment', e.target.value)}
                    className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-900 placeholder-gray-400 text-sm font-inter"
                    placeholder="100"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>
          );
        })}

        {/* Add Debt Button */}
        <button
          type="button"
          onClick={addDebt}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-inter"
        >
          + Add Another Debt
        </button>

        {/* Strategy Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-700 font-inter">
            Payoff Strategy
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value={PayoffStrategy.AVALANCHE}
                checked={strategy === PayoffStrategy.AVALANCHE}
                onChange={() => setStrategy(PayoffStrategy.AVALANCHE)}
                className="w-4 h-4"
                style={{ accentColor: '#10b981' }}
              />
              <span className="text-sm font-inter">Avalanche (Highest Interest First)</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value={PayoffStrategy.SNOWBALL}
                checked={strategy === PayoffStrategy.SNOWBALL}
                onChange={() => setStrategy(PayoffStrategy.SNOWBALL)}
                className="w-4 h-4"
                style={{ accentColor: '#10b981' }}
              />
              <span className="text-sm font-inter">Snowball (Smallest Balance First)</span>
            </label>
          </div>
        </div>

        {/* FIX B: Simplified extra payment input */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1 font-inter">
            Extra Monthly Payment ($)
          </label>
          <input
            type="number"
            value={extraPaymentStr}
            onChange={(e) => setExtraPaymentStr(e.target.value)}
            className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold text-gray-900 placeholder-gray-400 text-sm font-inter"
            placeholder="0"
            min="0"
            step="0.01"
          />
        </div>

        {/* FIX A: Disabled calculate button with clear messaging */}
        <button
          type="submit"
          disabled={!hasValidDebts}
          className={`w-full py-2.5 rounded-md font-semibold transition-colors text-sm font-inter ${
            hasValidDebts 
              ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {hasValidDebts ? 'Calculate Payoff Plan' : 'Please Complete Debt Information'}
        </button>
      </form>
    </div>
  );
}
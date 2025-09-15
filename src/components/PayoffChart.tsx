// src/components/PayoffChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface PaymentScenario {
  month: number;
  remainingBalance: number;
  totalInterestPaid: number;
  interestThisMonth: number;
  principalThisMonth: number;
  totalAmountPaid: number;
}

interface PayoffChartProps {
  data: PaymentScenario[];
}

export default function PayoffChart({ data }: PayoffChartProps) {
  // Format the data for the chart, showing every 6th month or so to avoid clutter
  const chartData = data.filter((_, index) => index % 6 === 0 || index === data.length - 1);

  // Custom formatter for currency
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 80, // INCREASED from default ~20px to 80px
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis 
            dataKey="month" 
            stroke="#666"
            fontSize={12}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            tick={{ fontSize: 12 }}
            tickFormatter={formatCurrency}
            label={{ 
              value: 'Balance ($)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: '12px' }
            }}
            width={70} // Set fixed width for Y-axis area
          />
          <Tooltip 
            formatter={(value: number) => [formatCurrency(value), 'Remaining Balance']}
            labelFormatter={(month) => `Month ${month}`}
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '12px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Line 
            type="monotone" 
            dataKey="remainingBalance" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
            name="Remaining Balance"
            activeDot={{ r: 6, fill: '#2563eb' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

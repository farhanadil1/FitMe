import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Protein', value: 90 },
  { name: 'Carbs', value: 200 },
  { name: 'Fats', value: 70 },
];

const COLORS = ['#4CAF50', '#FF9800', '#2196F3']; // General color palette: Green, Orange, Blue

const MacroBreakdownChart = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Macro Breakdown</h2>
      <PieChart width={300} height={250} className="ml-12 md:ml-28">
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="transition" />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default MacroBreakdownChart;

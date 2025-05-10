import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const sampleData = [
  { date: 'Mon', value: 140 },
  { date: 'Tue', value: 145 },
  { date: 'Wed', value: 142 },
  { date: 'Thu', value: 148 },
  { date: 'Fri', value: 150 },
  { date: 'Sat', value: 152 },
  { date: 'Sun', value: 155 },
];

const ProgressChart = ({ data = sampleData }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
        Weekly Progress
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              borderColor: '#ccc',
              color: '#000',
            }}
            wrapperStyle={{
              fontSize: '12px',
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ r: 5, fill: '#10b981' }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;

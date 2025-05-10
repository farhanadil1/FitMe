import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Mon', calories: 1800 },
  { day: 'Tue', calories: 1900 },
  { day: 'Wed', calories: 1750 },
  { day: 'Thu', calories: 2000 },
  { day: 'Fri', calories: 2200 },
  { day: 'Sat', calories: 2100 },
  { day: 'Sun', calories: 1950 },
];

const WeeklyCalorieTrend = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <h2 className="text-lg font-semibold text-black dark:text-white mb-2">Weekly Calorie Trend</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="day" stroke="#8884d8" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="calories"
            stroke="#34d399"
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyCalorieTrend;

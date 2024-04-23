"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface OverviewProps {
  data: any[];
}

export const Chart: React.FC<OverviewProps> = ({ data }) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
      className={"border border-cyan-50 py-2 rounded-sm"}
    >
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value: any) => `$${value}`}
        />
        <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

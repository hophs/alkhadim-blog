"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface AnalyticData {
  date: string;
  visits: number;
  subscribers: number;
  comments: number;
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((res) => {
        if (res.chartData) setData(res.chartData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-slate-200 rounded w-48" />
        <div className="h-[400px] bg-slate-200 rounded-xl" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">
          Monitor your traffic, engagement, and audience growth over the last 30 days.
        </p>
      </div>

      {/* Chart wrapper */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-6">30-Day Growth Metrics</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12, fill: "#64748B" }} 
                tickMargin={10}
                tickFormatter={(val) => {
                   const d = new Date(val);
                   return `${d.getMonth() + 1}/${d.getDate()}`;
                }}
              />
              <YAxis tick={{ fontSize: 12, fill: "#64748B" }} />
              <Tooltip 
                 contentStyle={{ borderRadius: "8px", border: "1px solid #E2E8F0" }}
              />
              <Legend />
              
              <Line
                type="monotone"
                dataKey="visits"
                name="Visits"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="subscribers"
                name="Subscribers"
                stroke="#8B5CF6"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="comments"
                name="Comments"
                stroke="#F59E0B"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

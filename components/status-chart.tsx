"use client"

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts"

interface StatusChartProps {
  statusCounts: {
    Working: number
    Break: number
    Meeting: number
    Offline: number
  }
}

export function StatusChart({ statusCounts }: StatusChartProps) {
  const data = [
    { name: "Working", value: statusCounts.Working, fill: "#16a34a" },
    { name: "Break", value: statusCounts.Break, fill: "#ca8a04" },
    { name: "Meeting", value: statusCounts.Meeting, fill: "#2563eb" },
    { name: "Offline", value: statusCounts.Offline, fill: "#6b7280" },
  ].filter((d) => d.value > 0)

  if (data.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No team members</div>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name}: ${value}`}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

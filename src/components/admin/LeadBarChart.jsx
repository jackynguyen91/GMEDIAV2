import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function LeadBarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
        <CartesianGrid vertical={false} stroke="#E8E2D3" />
        <XAxis
          dataKey="label"
          interval={4}
          tick={{ fontSize: 11, fill: "#1A1A1A" }}
          tickLine={false}
          axisLine={{ stroke: "#E8E2D3" }}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "#1A1A1A" }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          cursor={{ fill: "rgba(201, 162, 77, 0.12)" }}
          labelFormatter={(label) => `Ngày ${label}`}
          formatter={(value) => [`${value} lead`, "Số lead"]}
          contentStyle={{ borderRadius: 12, border: "1px solid #E8E2D3", fontSize: 12 }}
        />
        <Bar dataKey="count" fill="#C9A24D" radius={[4, 4, 0, 0]} maxBarSize={18} />
      </BarChart>
    </ResponsiveContainer>
  );
}
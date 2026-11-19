import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PALETTE = ["#C9A24D", "#1A1A1A", "#EAD58E", "#9A7430", "#7A7A7A", "#D9C7A0", "#4A4A4A", "#B99B5C"];

export default function LeadPieChart({ data }) {
  if (!data.length) {
    return (
      <p className="flex h-[260px] items-center justify-center font-body text-sm text-ink-soft/55">
        Chưa có dữ liệu lead theo dịch vụ.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="label"
          innerRadius={52}
          outerRadius={88}
          paddingAngle={2}
        >
          {data.map((entry, index) => (
            <Cell key={entry.label} fill={PALETTE[index % PALETTE.length]} stroke="#FFFFFF" />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`${value} lead`, name]}
          contentStyle={{ borderRadius: 12, border: "1px solid #E8E2D3", fontSize: 12 }}
        />
        <Legend
          verticalAlign="bottom"
          iconType="circle"
          formatter={(value) => <span style={{ fontSize: 11, color: "#1A1A1A" }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
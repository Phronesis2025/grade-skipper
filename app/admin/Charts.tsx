import {
  ResponsiveContainer,
  LineChart,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Bar,
} from "recharts";

interface ChartProps {
  type: "line" | "bar";
  data: any[];
  dataKey: string;
  stroke?: string;
  fill?: string;
}

export default function Charts({
  type,
  data,
  dataKey,
  stroke,
  fill,
}: ChartProps) {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        {type === "line" ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={stroke}
              strokeWidth={2}
            />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} fill={fill} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

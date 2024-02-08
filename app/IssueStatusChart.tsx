"use client";
import { Box, Heading, Text } from "@radix-ui/themes";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

interface CustomLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const IssueStatusChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];

  // green: #5BB98B, bronze: '#A18072',red: '#CE2C31', orange: '#EF5F00'
  //red: "#E54D2E", orange: "#F76B15", blue'#0090FF'
  // green: "#ADDDC0", blue: '#8EC8F6', orange:"#FFC182", red: "#C2B5F5"

  const COLORS1 = ["#D9D9D9", "#838383", "#202020"];
  // const COLORS2 = [ "#ADDDC0", '#8EC8F6', "#FFC182", "#EB8E90"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: CustomLabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const wrapperStyle = {
    fontSize: "12px",
    paddingLeft: "5px",
  };

  if (open + inProgress + closed === 0) {
    // Don't try to render the chart if there is no data.
    return <Text>No data yet</Text>;
  }

  return (
    <Box className="w-96 shadow-lg border-0">
      <Heading ml="3" size="4">
        Issue by status
      </Heading>
      <Box className="p-8">
      <ResponsiveContainer width="100%" height={200}>
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="label"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS1[index % COLORS1.length]}
              />
            ))}
            <Tooltip />
          </Pie>
          <Legend
            iconSize={10}
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={wrapperStyle}
          />
        </PieChart>
      </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default IssueStatusChart;

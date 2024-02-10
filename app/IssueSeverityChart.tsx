'use client'
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { Box, Heading, Text } from '@radix-ui/themes';

interface Props {
    minor: number;
    medium: number;
    major: number;
    critical: number;
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

 export default function IssueSeverityChart ({minor, medium, major, critical}: Props ) {
    const data = [
        { label: "Minor", value: minor },
        { label: "Medium", value: medium },
        { label: "Major", value: major},
        { label: "Critical", value: critical },
      ];
      const COLORS2 = [  "#646464","#8EC8F6","#C2A499",'#EB8E90' ];
      
      const RADIAN = Math.PI / 180;
      const renderCustomizedLabel = ({ cx, cy, midAngle,innerRadius, outerRadius, percent, index}: CustomLabelProps) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                { `${(percent * 100).toFixed(0)}%`}
            </text>
        )
      }
    
      const wrapperStyle = {
        fontSize: '12px',
        paddingLeft: '5px',
    
      }
      if ( minor + medium + major + critical === 0) {
        // Don't try to render the chart if there is no data.
        return (<Text className="font-semibold">No data yet</Text>);
      }

  return (
    <Box className="w-96 shadow-lg border-0">

    <Heading ml="3" size="4">Issues by severity</Heading>
    <Box className="p-8">
    <ResponsiveContainer width="100%" height={200}>
      <PieChart width={400} height={400}>
        <Pie data={data} cx="50%" cy="50%" labelLine={false}  label={renderCustomizedLabel} outerRadius={80} fill="#8884d8"
          dataKey="value" nameKey="label">
              {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
          ))}
          <Tooltip />
          </Pie>
          <Legend iconSize={10}  layout="vertical" align="right" verticalAlign="middle" wrapperStyle={wrapperStyle}/>
      </PieChart>
    </ResponsiveContainer>
    </Box>
  </Box>
  )
}



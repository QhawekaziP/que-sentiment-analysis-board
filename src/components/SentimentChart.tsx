import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface SentimentChartProps {
  data: Array<{
    date: string;
    positive: number;
    negative: number;
    neutral: number;
  }>;
}

export const SentimentChart = ({ data }: SentimentChartProps) => {
  return (
    <Card className="p-6 border-border/50">
      <h3 className="text-lg font-semibold text-foreground mb-4">Sentiment Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="positive" 
            stroke="hsl(var(--positive))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--positive))' }}
          />
          <Line 
            type="monotone" 
            dataKey="negative" 
            stroke="hsl(var(--negative))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--negative))' }}
          />
          <Line 
            type="monotone" 
            dataKey="neutral" 
            stroke="hsl(var(--neutral))" 
            strokeWidth={2}
            dot={{ fill: 'hsl(var(--neutral))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

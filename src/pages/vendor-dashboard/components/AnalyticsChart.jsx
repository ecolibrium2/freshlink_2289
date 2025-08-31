import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const AnalyticsChart = ({ title, data, type = 'line', dataKey, xAxisKey = 'name', className = '' }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-caption text-sm text-muted-foreground">{label}</p>
          <p className="font-body font-medium text-foreground">
            {`${payload?.[0]?.value} ${title?.includes('Visualizações') ? 'visualizações' : 'produtos'}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <h3 className="font-body font-semibold text-foreground mb-6">{title}</h3>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'line' ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey={xAxisKey} 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                fontFamily="var(--font-caption)"
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                fontFamily="var(--font-caption)"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey={dataKey} 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: 'var(--color-primary)' }}
              />
            </LineChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey={xAxisKey} 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                fontFamily="var(--font-caption)"
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                fontFamily="var(--font-caption)"
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={dataKey} 
                fill="var(--color-primary)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
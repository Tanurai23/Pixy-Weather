import { motion } from 'framer-motion';
import { useWeather } from '@/context/WeatherContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

export const ForecastChart = () => {
  const { weatherData, convertTemp, unit, theme } = useWeather();

  if (!weatherData || weatherData.daily.length === 0) return null;

  const chartData = weatherData.daily.map((day) => ({
    day: new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
    min: Math.round(convertTemp(day.temp_min)),
    max: Math.round(convertTemp(day.temp_max)),
    avg: Math.round((convertTemp(day.temp_min) + convertTemp(day.temp_max)) / 2),
  }));

  const isDark = theme === 'dark';
  const strokeColor = isDark ? '#a78bfa' : '#8b5cf6';
  const fillColor = isDark ? '#7c3aed' : '#a78bfa';

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="w-full px-4 md:px-6 mb-6"
      aria-label="Forecast chart"
    >
      <div className="bg-secondary/95 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-lg border border-border">
        <h3 className="text-xs font-pixel text-foreground mb-4 opacity-80">Temperature Trend</h3>
        
        <div className="h-48 md:h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={fillColor} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={fillColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 8, fontFamily: 'Press Start 2P', fill: isDark ? '#9ca3af' : '#6b7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 8, fontFamily: 'Press Start 2P', fill: isDark ? '#9ca3af' : '#6b7280' }}
                axisLine={false}
                tickLine={false}
                domain={['dataMin - 2', 'dataMax + 2']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#1f2937' : '#fff',
                  border: '2px solid #000',
                  borderRadius: '8px',
                  fontFamily: 'Press Start 2P',
                  fontSize: '8px',
                  boxShadow: '0 3px 0 #c5c5c5',
                }}
                formatter={(value: number) => [`${value}°${unit === 'celsius' ? 'C' : 'F'}`, 'Temp']}
              />
              <Area 
                type="monotone" 
                dataKey="max" 
                stroke={strokeColor}
                strokeWidth={2}
                fill="url(#colorTemp)" 
              />
              <Line 
                type="monotone" 
                dataKey="min" 
                stroke={isDark ? '#60a5fa' : '#3b82f6'}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex justify-center gap-6 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded" style={{ backgroundColor: strokeColor }} />
            <span className="text-[8px] text-muted-foreground">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 rounded border-dashed border-b-2" style={{ borderColor: isDark ? '#60a5fa' : '#3b82f6' }} />
            <span className="text-[8px] text-muted-foreground">Low</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
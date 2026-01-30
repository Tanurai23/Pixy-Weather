import { motion } from 'framer-motion';
import { useWeather } from '@/context/WeatherContext';

export const WeeklyForecast = () => {
  const { weatherData, convertTemp } = useWeather();

  if (!weatherData) return null;

  const formatDay = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="w-full px-4 md:px-6 mb-6"
      aria-label="Weekly forecast"
    >
      <div className="bg-secondary/95 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-lg border border-border">
        <h3 className="text-xs font-pixel text-foreground mb-4 opacity-80">7-Day Forecast</h3>
        <div className="space-y-0">
          {weatherData.daily.map((day, index) => (
            <motion.div
              key={day.dt}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="week-row"
            >
              <span className="text-[10px] md:text-xs w-12 text-foreground">
                {formatDay(day.dt)}
              </span>
              <span className="text-xl md:text-2xl">{day.icon}</span>
              <div className="flex gap-2 md:gap-4 text-[10px] md:text-xs">
                <span className="text-muted-foreground">
                  {Math.round(convertTemp(day.temp_min))}°
                </span>
                <span className="text-foreground font-bold">
                  {Math.round(convertTemp(day.temp_max))}°
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
import { motion } from 'framer-motion';
import { useWeather } from '@/context/WeatherContext';

export const HourlyForecast = () => {
  const { weatherData, convertTemp, unit } = useWeather();

  if (!weatherData) return null;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full px-4 md:px-6 mb-6"
      aria-label="Hourly forecast"
    >
      <div className="bg-secondary/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-border">
        <h3 className="text-xs font-pixel text-foreground mb-4 opacity-80">Hourly Forecast</h3>
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {weatherData.hourly.slice(0, 8).map((hour, index) => (
            <motion.div
              key={hour.dt}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="forecast-card min-w-[70px] md:min-w-[80px] flex-shrink-0"
            >
              <span className="text-[8px] md:text-[10px] text-muted-foreground block mb-2">
                {formatTime(hour.dt)}
              </span>
              <span className="text-2xl md:text-3xl block mb-2">{hour.icon}</span>
              <span className="text-[10px] md:text-xs font-bold text-foreground">
                {Math.round(convertTemp(hour.temp))}°
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
import { motion } from 'framer-motion';
import { useWeather } from '@/context/WeatherContext';
import { Wind, Droplets, Gauge, Eye, Sunrise, Sunset } from 'lucide-react';

export const WeatherDetails = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { current, airQuality } = weatherData;

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getAqiLabel = (aqi: number) => {
    const labels = ['', 'Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];
    return labels[aqi] || 'Unknown';
  };

  const getAqiColor = (aqi: number) => {
    const colors = ['', 'text-green-500', 'text-yellow-500', 'text-orange-500', 'text-red-500', 'text-purple-500'];
    return colors[aqi] || 'text-gray-500';
  };

  const details = [
    {
      icon: <Wind className="w-5 h-5" />,
      label: 'Wind',
      value: `${current.wind_speed.toFixed(1)} m/s`,
      sublabel: `${current.wind_deg}°`,
    },
    {
      icon: <Droplets className="w-5 h-5" />,
      label: 'Humidity',
      value: `${current.humidity}%`,
    },
    {
      icon: <Gauge className="w-5 h-5" />,
      label: 'Pressure',
      value: `${current.pressure} hPa`,
    },
    {
      icon: <Eye className="w-5 h-5" />,
      label: 'Visibility',
      value: `${(current.visibility / 1000).toFixed(1)} km`,
    },
    {
      icon: <Sunrise className="w-5 h-5" />,
      label: 'Sunrise',
      value: formatTime(current.sunrise),
    },
    {
      icon: <Sunset className="w-5 h-5" />,
      label: 'Sunset',
      value: formatTime(current.sunset),
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full px-4 md:px-6 mb-6"
      aria-label="Weather details"
    >
      <div className="bg-secondary/95 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-lg border border-border">
        <h3 className="text-xs font-pixel text-foreground mb-4 opacity-80">Weather Details</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {details.map((detail, index) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className="detail-card"
            >
              <div className="text-accent mb-2">{detail.icon}</div>
              <p className="text-[8px] md:text-[10px] text-muted-foreground mb-1">{detail.label}</p>
              <p className="text-[10px] md:text-xs font-bold text-foreground">{detail.value}</p>
              {detail.sublabel && (
                <p className="text-[8px] text-muted-foreground">{detail.sublabel}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Air Quality */}
        {airQuality && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4 pt-4 border-t border-border"
          >
            <h4 className="text-[10px] font-pixel text-foreground mb-3 opacity-80">Air Quality Index</h4>
            <div className="flex items-center gap-4">
              <div className={`text-3xl font-bold ${getAqiColor(airQuality.aqi)}`}>
                {airQuality.aqi}
              </div>
              <div>
                <p className={`text-sm font-bold ${getAqiColor(airQuality.aqi)}`}>
                  {getAqiLabel(airQuality.aqi)}
                </p>
                <p className="text-[8px] text-muted-foreground mt-1">
                  PM2.5: {airQuality.components.pm2_5.toFixed(1)} µg/m³
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
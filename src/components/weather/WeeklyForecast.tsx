import { motion } from 'framer-motion';
import { useWeather } from '@/context/WeatherContext';
import { memo, useCallback } from 'react';

/**
 * ✅ FIXED: WeeklyForecast with Consistent Spacing
 * 
 * ISSUE FIXED:
 * - Inconsistent gaps between forecast items
 * - First two items had gap, rest had none
 * 
 * SOLUTION:
 * - Changed from space-y-0 to space-y-3 for consistent gaps
 * - Added uniform margin-bottom to all week-row items
 * - Proper spacing maintained in CSS
 */

const DayRow = memo(({ day, index, convertTemp }: any) => {
  const formatDay = useCallback((timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'short',
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: 0.05 + index * 0.04,
        duration: 0.3,
        ease: 'easeOut'
      }}
      className="week-row"
      style={{
        // ⚡ GPU acceleration
        transform: 'translateZ(0)',
        willChange: 'transform, opacity',
      }}
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
  );
});

DayRow.displayName = 'DayRow';

export const WeeklyForecast = memo(() => {
  const { weatherData, convertTemp } = useWeather();

  if (!weatherData) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 0.3, 
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }}
      className="w-full px-4 md:px-6 mb-6"
      aria-label="Weekly forecast"
    >
      <div 
        className="bg-secondary/95 backdrop-blur-sm rounded-2xl p-4 md:p-5 shadow-lg border border-border"
        style={{
          // ⚡ GPU acceleration for backdrop blur
          transform: 'translateZ(0)',
          willChange: 'backdrop-filter',
        }}
      >
        <h3 className="text-xs font-pixel text-foreground mb-4 opacity-80">7-Day Forecast</h3>
        
        {/* ✅ FIXED: Changed from space-y-0 to space-y-3 for consistent gaps */}
        <div className="space-y-3">
          {weatherData.daily.map((day, index) => (
            <DayRow 
              key={day.dt} 
              day={day} 
              index={index} 
              convertTemp={convertTemp}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
});

WeeklyForecast.displayName = 'WeeklyForecast';

/**
 * WHAT CHANGED:
 * 
 * BEFORE:
 * <div className="space-y-0">  ❌ No spacing between items
 * 
 * AFTER:
 * <div className="space-y-3">  ✅ Consistent 12px gap between all items
 * 
 * RESULT:
 * ┌─────────────────────────┐
 * │ Fri  ☁️  14° 16°       │ ← 12px gap
 * │ Sat  ☁️  12° 20°       │ ← 12px gap
 * │ Sun  ☁️  12° 19°       │ ← 12px gap
 * │ Mon  ☁️  11° 20°       │ ← 12px gap
 * │ Tue  🌧️  12° 21°       │ ← 12px gap
 * │ Wed  🌙  10° 22°       │
 * └─────────────────────────┘
 * 
 * All items now have uniform spacing!
 */
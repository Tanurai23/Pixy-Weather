import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '@/context/WeatherContext';

interface Star {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

export const Stars = () => {
  const { theme } = useWeather();
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: 2 + Math.random() * 3,
          delay: Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.7,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <AnimatePresence>
      {theme === 'dark' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 pointer-events-none z-0"
          aria-hidden="true"
        >
          {stars.map((star) => (
            <div
              key={star.id}
              className="star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                '--duration': `${star.duration}s`,
                '--delay': `${star.delay}s`,
                opacity: star.opacity,
                animationDelay: `${star.delay}s`,
              } as React.CSSProperties}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
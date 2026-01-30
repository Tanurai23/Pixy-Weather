import { motion } from 'framer-motion';

export const LoadingState = () => {
  return (
    <div className="w-full px-4 md:px-6 space-y-6">
      {/* Current weather skeleton */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-72 md:h-80 rounded-2xl bg-card/50 loading-pulse flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-5xl mb-4"
          >
            🌀
          </motion.div>
          <p className="text-xs font-pixel text-card-foreground opacity-70">
            Loading weather...
          </p>
        </div>
      </motion.div>

      {/* Hourly skeleton */}
      <div className="bg-secondary/50 rounded-2xl p-4 loading-pulse">
        <div className="h-4 w-32 bg-muted rounded mb-4" />
        <div className="flex gap-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 w-20 bg-muted rounded-xl" />
          ))}
        </div>
      </div>

      {/* Weekly skeleton */}
      <div className="bg-secondary/50 rounded-2xl p-4 loading-pulse">
        <div className="h-4 w-32 bg-muted rounded mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};
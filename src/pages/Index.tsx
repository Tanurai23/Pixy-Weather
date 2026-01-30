import { WeatherProvider } from '@/context/WeatherContext';
import { WeatherApp } from '@/components/weather';

const Index = () => {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
};

export default Index;

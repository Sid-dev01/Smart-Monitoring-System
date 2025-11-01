import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import FeaturesSection from '../components/FeaturesSection';
import LiveMonitoringPreview from '../components/LiveMonitoringPreview';

const Home = () => {
  return (
    <div className="pt-16">
      <Hero />
      <StatsSection />
      <FeaturesSection />
      <LiveMonitoringPreview />
    </div>
  );
};

export default Home;

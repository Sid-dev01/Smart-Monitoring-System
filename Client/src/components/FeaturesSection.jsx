import { motion } from 'framer-motion';
import { 
  Eye, 
  Activity, 
  Flag, 
  Brain, 
  Users, 
  Cloud 
} from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
    >
      <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Eye,
      title: 'All Image Analysis',
      description: 'Advanced computer vision algorithms analyze every frame to detect student engagement, activity, and behavior patterns in real-time.',
    },
    {
      icon: Activity,
      title: 'Real-time Analytics',
      description: 'Get instant insights into classroom dynamics with live dashboards showing engagement metrics, participation levels, and attention spans.',
    },
    {
      icon: Flag,
      title: 'Automated Flagging',
      description: 'Smart detection system automatically identifies concerning patterns and flags sessions requiring immediate attention or review.',
    },
    {
      icon: Brain,
      title: 'Smart Learning',
      description: 'AI-powered recommendations help trainers improve their teaching methods based on historical data and best practices.(In the near future)',
    },
    {
      icon: Users,
      title: 'Multi-user Dashboard',
      description: 'Collaborative platform allowing administrators, trainers, and supervisors to access insights based on their role and permissions.(In the near future)',
    },
    {
      icon: Cloud,
      title: 'Cloud Integration',
      description: 'Secure cloud infrastructure ensures your data is always accessible, backed up, and protected with enterprise-grade security.(In the near future)',
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to monitor, analyze, and improve your training programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

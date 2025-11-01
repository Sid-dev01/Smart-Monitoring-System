import { motion } from 'framer-motion';
import { Play, TrendingUp, Users, Award } from 'lucide-react';
import { useStore } from '../store/useStore';

const LiveMonitoringPreview = () => {
  const { openDemoModal } = useStore();

  const metrics = [
    { icon: Users, label: 'Active Students', value: '28', color: 'text-blue-600' },
    { icon: TrendingUp, label: 'Engagement', value: '85%', color: 'text-green-600' },
    { icon: Award, label: 'Session Score', value: '92', color: 'text-purple-600' },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Live Monitoring Preview
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            See real-time insights as your training sessions unfold
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Video Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative group cursor-pointer"
            onClick={openDemoModal}
          >
            <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              {/* Video Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <p className="text-white font-medium">Click to Watch Demo</p>
                </div>
              </div>

              {/* Live Badge */}
              <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white text-sm font-medium">LIVE</span>
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-accent-600/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>

          {/* Metrics */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow"
              >
                <div className={`w-12 h-12 ${metric.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                  <metric.icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    {metric.label}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="bg-gradient-to-r from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl p-6 border border-accent-100 dark:border-accent-800"
            >
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Current Activities Detected
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Reading', 'Writing', 'Raising Hand', 'Listening'].map((activity) => (
                  <span
                    key={activity}
                    className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveMonitoringPreview;

import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, TrendingUp, Award, Activity } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useEffect, useState } from 'react';
import { getLiveMetrics, getDemoVideo } from '../utils/mockApi';

const MetricCard = ({ icon: Icon, label, value, trend }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-accent-600" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {label}
          </span>
        </div>
        {trend && (
          <span className="text-xs text-green-600 dark:text-green-400">
            +{trend}%
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </motion.div>
  );
};

const DemoModal = () => {
  const { isDemoModalOpen, closeDemoModal, addToast } = useStore();
  const [metrics, setMetrics] = useState(null);
  const [activityLog, setActivityLog] = useState([]);
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    if (isDemoModalOpen) {
      // Load demo video
      getDemoVideo().then(data => setVideoUrl(data.videoUrl));

      // Initial metrics load
      loadMetrics();

      // Update metrics every 3 seconds
      const interval = setInterval(() => {
        loadMetrics();
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isDemoModalOpen]);

  const loadMetrics = async () => {
    try {
      const data = await getLiveMetrics();
      setMetrics(data);

      // Add to activity log
      const timestamp = new Date().toLocaleTimeString();
      setActivityLog(prev => [
        {
          time: timestamp,
          message: `Updated: ${data.student_count} students, ${data.engagement}% engaged`,
        },
        ...prev.slice(0, 4), // Keep only last 5 entries
      ]);

      // Show toast for significant changes
      if (data.engagement < 60) {
        addToast({
          type: 'error',
          message: 'Low engagement detected!',
        });
      } else if (data.student_score > 85) {
        addToast({
          type: 'success',
          message: 'Excellent session performance!',
        });
      }
    } catch (error) {
      console.error('Error loading metrics:', error);
    }
  };

  if (!isDemoModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeDemoModal}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Live Demo Session
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Real-time classroom monitoring and analytics
              </p>
            </div>
            <button
              onClick={closeDemoModal}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-88px)]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Video Player */}
              <div className="lg:col-span-2 space-y-4">
                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  >
                    Your browser does not support the video tag.
                  </video>

                  {/* Live Badge */}
                  <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-white text-sm font-medium">LIVE</span>
                  </div>
                </div>

                {/* Activity Log */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-accent-600" />
                    Activity Timeline
                  </h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {activityLog.map((log, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2"
                      >
                        <span className="text-accent-600 font-mono">{log.time}</span>
                        <span>{log.message}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Live Metrics */}
              <div className="space-y-4">
                {metrics && (
                  <>
                    <MetricCard
                      icon={Users}
                      label="Student Count"
                      value={metrics.student_count}
                    />
                    <MetricCard
                      icon={TrendingUp}
                      label="Engagement"
                      value={`${metrics.engagement}%`}
                      trend={5}
                    />
                    <MetricCard
                      icon={Award}
                      label="Session Score"
                      value={metrics.student_score}
                      trend={3}
                    />

                    {/* Activities */}
                    <div className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Detected Activities
                      </h4>
                      <div className="space-y-2">
                        {metrics.activities.map((activity, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg"
                          >
                            <div className="w-2 h-2 bg-green-500 rounded-full" />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {activity}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                        <span className="font-semibold text-green-900 dark:text-green-300">
                          Session Status: Active
                        </span>
                      </div>
                      <p className="text-sm text-green-700 dark:text-green-400">
                        All systems operational. Monitoring in progress.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DemoModal;

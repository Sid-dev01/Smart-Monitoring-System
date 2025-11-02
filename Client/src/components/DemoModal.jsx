// Client/src/components/DemoModal.js
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, TrendingUp, Award, Activity } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useEffect, useState, useRef } from 'react'; // <-- Import useRef

// --- 1. Define all our API and media URLs ---
// Make sure these are HTTP and match your backend files
const API_START_URL = 'http://127.0.0.1:8000/api/ml/process-demo/';
const VIDEO_URL = 'http://127.0.0.1:8000/media/final_demo.mp4';
const DATA_URL = 'http://127.0.0.1:8000/media/demo_data.json';

// This will be our polling timer
let pollingInterval = null;

// (Your MetricCard component is fine, so I've hidden it for brevity)
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
  // We remove addToast, as our new store doesn't have it
  const { isDemoModalOpen, closeDemoModal } = useStore();
  
  // --- 2. Set up our new state variables ---
  const [metrics, setMetrics] = useState(null); // For the *current* metrics
  const [allDemoData, setAllDemoData] = useState([]); // To store the *entire* JSON
  const [videoSrc, setVideoSrc] = useState(null); // To set the video player source
  const [isLoading, setIsLoading] = useState(false); // To show a "Processing..." message
  const [errorMessage, setErrorMessage] = useState('');
  
  // We need a 'ref' to get the video's current time
  const videoRef = useRef(null);

  // --- 3. This is the main effect that runs when the modal opens ---
  useEffect(() => {
    if (isDemoModalOpen) {
      // Reset state every time modal opens
      setIsLoading(true);
      setErrorMessage('');
      setVideoSrc(null);
      setMetrics(null);
      setAllDemoData([]);
      
      // Start the process
      startProcessing();
    }
    
    // Cleanup function: stop polling if modal is closed
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [isDemoModalOpen]);

  // --- 4. Function to start the backend processing ---
  const startProcessing = async () => {
    try {
      // This calls your Django API to start the task
      const response = await fetch(API_START_URL, { method: 'POST' });
      const data = await response.json();

      if (response.status === 202 && data.status === 'processing') {
        // Backend started! Now we start polling for the JSON file.
        console.log("Processing started... beginning to poll.");
        pollingInterval = setInterval(checkFileStatus, 3000); // Check every 3 secs
      } else {
        setErrorMessage('Error starting process: ' + (data.message || data.error));
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage('Could not connect to server. Is your Django server running?');
      setIsLoading(false);
    }
  };
  
  // --- 5. Function to poll for the data file ---
  const checkFileStatus = () => {
    // Add timestamp to URL to prevent browser caching
    const urlToProbe = `${DATA_URL}?t=${new Date().getTime()}`;
    
    fetch(urlToProbe, { method: 'GET' })
      .then(response => {
        if (response.ok) {
          // --- 6. SUCCESS! ---
          console.log("Data file is ready!");
          clearInterval(pollingInterval); // Stop polling
          
          // Download the JSON data
          response.json().then(data => {
            if (data && data.length > 0) {
              setAllDemoData(data); // Store the entire dataset
              setMetrics(data[0].metrics); // Set initial metrics
              
              // Now that data is loaded, set the video source
              setVideoSrc(`${VIDEO_URL}?t=${new Date().getTime()}`);
              setIsLoading(false);
            } else {
              setErrorMessage("Processed data is empty.");
              setIsLoading(false);
            }
          });
          
        } else {
          // File not found yet, keep polling
          console.log("Data not ready, polling again...");
        }
      })
      .catch(error => {
        console.log("Polling error, will retry...", error);
        setErrorMessage("Polling for data file failed.");
        setIsLoading(false);
        clearInterval(pollingInterval);
      });
  };

  // --- 7. NEW: This function syncs the video time to the data ---
  const handleTimeUpdate = () => {
    if (!videoRef.current || !allDemoData.length) return;

    const currentTime = videoRef.current.currentTime;
    
    // Find the closest metric in our data array for the current video time
    // This logic finds the *last* data point whose time is <= the video time
    let closestMetric = allDemoData[0];
    for (const dataPoint of allDemoData) {
      if (dataPoint.time <= currentTime) {
        closestMetric = dataPoint;
      } else {
        break; // Stop when we've gone past the current time
      }
    }
    
    // Update the dashboard
    if (closestMetric && closestMetric.metrics) {
      setMetrics(closestMetric.metrics);
    }
  };

  // --- 8. This is the render logic ---
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
                Classroom Demo
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Processing and analyzing pre-recorded demo video...
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
                  
                  {/* --- 9. Check for loading/video --- */}
                  {isLoading && (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <p className="text-white text-lg">Processing video, please wait...</p>
                      <p className="text-gray-400 text-sm">(This may take a minute or two)</p>
                    </div>
                  )}
                  {errorMessage && (
                     <div className="w-full h-full flex items-center justify-center">
                      <p className="text-red-400 text-lg">{errorMessage}</p>
                    </div>
                  )}
                  {videoSrc && (
                    <video
                      ref={videoRef} // <-- Attach the ref
                      src={videoSrc} // <-- Set the source
                      onTimeUpdate={handleTimeUpdate} // <-- Sync on time update!
                      controls
                      autoPlay
                      loop
                      muted
                      className="w-full h-full object-cover"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                  
                </div>
                {/* (Your Activity Log can be put back here) */}
              </div>

              {/* Live Metrics */}
              <div className="space-y-4">
                {/* --- 10. Update metrics based on state --- */}
                {metrics ? (
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
                      // trend={5} (We can remove trend for now)
                    />
                    <MetricCard
                      icon={Award}
                      label="Session Score"
                      value={metrics.student_score}
                      // trend={3}
                    />
                    <div className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900/20 dark:to-primary-900/20 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        Detected Activities
                      </h4>
                      <div className="space-y-2">
                        {metrics.activities.length > 0 ? (
                           metrics.activities.map((activity, index) => (
                            <motion.div 
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg"
                            >
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{activity}</span>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-500">No specific activities detected.</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    {isLoading ? "Waiting for video processing to finish..." : "Metrics will appear here."}
                  </p>
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
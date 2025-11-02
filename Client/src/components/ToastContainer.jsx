import React from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';

// Define icons for different toast types
const icons = {
  success: <CheckCircle className="w-5 h-5 text-green-500" />,
  error: <AlertTriangle className="w-5 h-5 text-red-500" />,
};

const ToastContainer = () => {
  // Get the list of toasts and the remove function from the store
  const { toasts, removeToast } = useStore();

  // If the toasts list is empty, this component renders nothing.
  // This also prevents the .map() error if 'toasts' was undefined.
  if (!toasts || toasts.length === 0) {
    return null;
  }

  return (
    // This div positions the container in the top-right corner
    <div className="fixed top-4 right-4 z-[9999] w-80 space-y-3">
      <AnimatePresence>
        {/* This is the .map() that was crashing.
            Now 'toasts' is a guaranteed array from our store. */}
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-start space-x-3"
          >
            {/* Icon (success or error) */}
            <div className="flex-shrink-0">
              {icons[toast.type] || <AlertTriangle className="w-5 h-5 text-gray-500" />}
            </div>
            
            {/* Message */}
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {toast.message}
              </p>
            </div>
            
            {/* Close Button */}
            <button onClick={() => removeToast(toast.id)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
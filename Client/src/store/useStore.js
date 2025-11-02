import { create } from 'zustand';

export const useStore = create((set) => ({
  
  // --- Modal State (This part is fine) ---
  isDemoModalOpen: false,
  openDemoModal: () => set({ isDemoModalOpen: true }),
  closeDemoModal: () => set({ isDemoModalOpen: false }),

  // --- Toast State (THIS IS THE FIX) ---
  toasts: [], // <-- We must provide an empty array for .map()

  // This function will now add a toast to the array
  addToast: (newToast) => {
    const id = Date.now(); // Give each toast a unique ID
    set((state) => ({
      // Add the new toast to the *end* of the array
      toasts: [...state.toasts, { id, ...newToast }], 
    }));
    
    // Set a timer to automatically remove the toast after 3 seconds
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },

  // This function lets a user click 'X' to remove a toast
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
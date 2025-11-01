import { create } from 'zustand';

export const useStore = create((set) => ({
  // Theme state
  darkMode: false,
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  // Demo modal state
  isDemoModalOpen: false,
  openDemoModal: () => set({ isDemoModalOpen: true }),
  closeDemoModal: () => set({ isDemoModalOpen: false }),
  
  // Toast notifications
  toasts: [],
  addToast: (toast) => set((state) => ({
    toasts: [...state.toasts, { id: Date.now(), ...toast }]
  })),
  removeToast: (id) => set((state) => ({
    toasts: state.toasts.filter(t => t.id !== id)
  })),
  
  // Selected report
  selectedReport: null,
  setSelectedReport: (report) => set({ selectedReport: report }),
  clearSelectedReport: () => set({ selectedReport: null }),
}));

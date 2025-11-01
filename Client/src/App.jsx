import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastContainer from './components/ToastContainer';
import DemoModal from './components/DemoModal';
import Subscription from './components/Subscription';
import Home from './pages/Home';
import About from './pages/About';
import Reports from './pages/Reports';

function App() {
  const { darkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // 2. Add the handler function for the subscription button
  const handleSubscribeClick = (plan) => {
    console.log('Subscribed to:', plan.name);
    alert(`You clicked on the ${plan.name} plan!`);
    // You can add other logic here, like navigating to a checkout
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/reports" element={<Reports />} />
            <Route 
              path="/subscription" 
              element={<Subscription onSubscribe={handleSubscribeClick} />} 
            />
          </Routes>
        </main>
        <Footer />
        <ToastContainer />
        <DemoModal />
      </div>
    </Router>
  );
}

export default App;


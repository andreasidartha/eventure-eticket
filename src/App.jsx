import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-sans text-gray-800 dark:text-gray-200">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<div className="flex items-center justify-center h-screen text-2xl font-semibold">Loading...</div>}>
            <AppRoutes />
          </Suspense>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { DataProvider } from '@/contexts/DataContext';
import HomePage from '@/pages/HomePage';
import BookRidePage from '@/pages/BookRidePage';
import OfferRidePage from '@/pages/OfferRidePage';
import DashboardPage from '@/pages/DashboardPage';
import ProfilePage from '@/pages/ProfilePage';

function App() {
  return (
    <>
      <Helmet>
        <title>Rural Connect - Connecting Rural Communities Through Ride Sharing</title>
        <meta name="description" content="Connect with fellow rural community members for safe, affordable car and bike rides. Join Rural Connect to travel together and build stronger communities." />
      </Helmet>
      <DataProvider>
        <Router>
          <div className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book-ride" element={<BookRidePage />} />
              <Route path="/offer-ride" element={<OfferRidePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
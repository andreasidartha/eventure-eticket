import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const LandingPage = lazy(() => import('../pages/LandingPage'));
const EventListPage = lazy(() => import('../pages/EventListPage'));
const EventDetailPage = lazy(() => import('../pages/EventDetailPage'));
const CheckoutPage = lazy(() => import('../pages/CheckoutPage'));
const TicketPage = lazy(() => import('../pages/TicketPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const MyTicketsPage = lazy(() => import('../pages/MyTicketsPage'));
const ProfilePage = lazy(() => import('../pages/ProfilePage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/events" element={<EventListPage />} />
      <Route path="/events/:id" element={<EventDetailPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/ticket/:id" element={<TicketPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/my-tickets" element={<MyTicketsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;

import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ContractorDashboard from './pages/ContractorDashboard';
import ShopOwnerDashboard from './pages/ShopOwnerDashboard';
import Marketplace from './pages/Marketplace';
import MaterialDetailPage from './pages/MaterialDetailPage';
import OrderMessaging from './pages/OrderMessaging';
import ReviewsRatings from './pages/ReviewsRatings';
import ProfileSettings from './pages/ProfileSettings';

export default function App() {
  const [page, setPage] = useState('landing');
  const [user, setUser] = useState(null);

  function navigate(pageName) {
    setPage(pageName);
  }

  function login(userData) {
    setUser(userData);
    if (userData.role === 'contractor') setPage('contractor-dashboard');
    else setPage('supplier-dashboard');
  }

  function logout() {
    setUser(null);
    setPage('landing');
  }

  if (page === 'landing') return <LandingPage navigate={navigate} />;
  if (page === 'auth') return <AuthPage navigate={navigate} login={login} />;
  if (page === 'contractor-dashboard')
    return (
      <ContractorDashboard navigate={navigate} logout={logout} user={user} />
    );
  if (page === 'supplier-dashboard')
    return (
      <ShopOwnerDashboard navigate={navigate} logout={logout} user={user} />
    );
  if (page === 'marketplace') return <Marketplace navigate={navigate} />;
  if (page === 'material-detail')
    return <MaterialDetailPage navigate={navigate} />;
  if (page === 'orders') return <OrderMessaging navigate={navigate} />;
  if (page === 'reviews') return <ReviewsRatings navigate={navigate} />;
  if (page === 'profile')
    return <ProfileSettings navigate={navigate} logout={logout} user={user} />;

  return <LandingPage navigate={navigate} />;
}

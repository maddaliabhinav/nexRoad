import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthForm } from './components/Auth/AuthForm';
import { Layout } from './components/Layout/Layout';
import { UserDashboard } from './components/Dashboard/UserDashboard';
import { ProviderDashboard } from './components/Dashboard/ProviderDashboard';
import { MapView } from './components/Map/MapView';
import { ServiceRequest } from './components/Services/ServiceRequest';
import { MessageCenter } from './components/Messages/MessageCenter';
import { FuelServices } from './components/Services/FuelServices';
import { MechanicServices } from './components/Services/MechanicServices';
import { Analytics } from './components/Analytics/Analytics';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const AuthPage: React.FC = () => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  return <AuthForm mode={authMode} onModeChange={setAuthMode} />;
};

const DashboardRoute: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Layout title="Dashboard">
      {user?.userType === 'user' ? <UserDashboard /> : <ProviderDashboard />}
    </Layout>
  );
};

const AppContent: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <AuthPage />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Navigate to="/dashboard" />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardRoute />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <Layout title="Map View">
                <MapView />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/request"
          element={
            <ProtectedRoute>
              <Layout title="Request Service">
                <ServiceRequest />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Layout title="Messages">
                <MessageCenter />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Layout title="Profile">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Settings</h2>
                  <p className="text-gray-600 mt-2">Manage your account settings and preferences.</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout title="Settings">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900">Settings</h2>
                  <p className="text-gray-600 mt-2">Configure your application preferences.</p>
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/fuel-services"
          element={
            <ProtectedRoute>
              <Layout title="Fuel Services">
                <FuelServices />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/mechanic-services"
          element={
            <ProtectedRoute>
              <Layout title="Mechanic Services">
                <MechanicServices />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Layout title="Analytics">
                <Analytics />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
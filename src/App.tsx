import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/Layout/MainLayout';
import { MobileControlBar } from './components/Controls/MobileControlBar';
import { ApiCard } from './components/ApiCard/ApiCard';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminCategories } from './pages/AdminCategories';
import { AdminAdmins } from './pages/AdminAdmins';
import { AdminProviders } from './pages/AdminProviders';
import { ProtectedRoute } from './components/Admin/ProtectedRoute';
import { useStore } from './store/useStore';
import { apiProviders } from './data/apiProviders';
import { filterAndSortApis } from './utils/filterUtils';
import { useDebounce } from './hooks/useDebounce';

function ApiList() {
  const { 
    selectedCategory, 
    searchQuery, 
    filters,
    globalUsage,
    usageOverrides,
    hasActiveSliders
  } = useStore();

  const debouncedGlobalUsage = useDebounce(globalUsage, 2000);
  const debouncedUsageOverrides = useDebounce(usageOverrides, 2000);

  const filteredApis = filterAndSortApis(
    apiProviders,
    filters,
    searchQuery,
    selectedCategory,
    usageOverrides,
    globalUsage,
    debouncedUsageOverrides,
    debouncedGlobalUsage,
    hasActiveSliders
  );

  return (
    <MainLayout>
      <div className="space-y-4">
        <div className="lg:hidden">
          <MobileControlBar />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredApis.map((api) => (
            <ApiCard key={api.id} api={api} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ApiList />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <AdminCategories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/providers"
          element={
            <ProtectedRoute>
              <AdminProviders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/admins"
          element={
            <ProtectedRoute>
              <AdminAdmins />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;


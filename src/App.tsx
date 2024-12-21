import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminCategories } from './pages/AdminCategories';
import { AdminCategoryForm } from './pages/AdminCategoryForm';
import { AdminApis } from './pages/AdminApis';
import { AdminApiForm } from './pages/AdminApiForm';
import { AdminAdmins } from './pages/AdminAdmins';
import { AdminForm } from './pages/AdminForm';
import { AdminLogin } from './pages/AdminLogin';
import { AdminActivities } from './pages/AdminActivities';
import { ActivityDetails } from './components/Admin/Activities/ActivityDetails';
import { ProtectedRoute } from './components/Admin/ProtectedRoute';
import { MainLayout } from './components/Layout/MainLayout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout><div className="container mx-auto px-4"></div></MainLayout>} />
        <Route path="/admin" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/categories/add" element={<AdminCategoryForm />} />
          <Route path="/admin/categories/edit/:id" element={<AdminCategoryForm />} />
          
          <Route path="/admin/apis" element={<AdminApis />} />
          <Route path="/admin/apis/add" element={<AdminApiForm />} />
          <Route path="/admin/apis/edit/:id" element={<AdminApiForm />} />
          
          <Route path="/admin/admins" element={<AdminAdmins />} />
          <Route path="/admin/admins/add" element={<AdminForm />} />
          <Route path="/admin/admins/edit/:id" element={<AdminForm />} />
          
          <Route path="/admin/activities" element={<AdminActivities />} />
          <Route path="/admin/activities/:id" element={<ActivityDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

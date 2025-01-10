import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuthStore } from './store/auth';
import { LoadingState } from './components/common/LoadingState';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const TestCases = React.lazy(() => import('./pages/TestCases'));
const TestRequirements = React.lazy(() => import('./pages/TestRequirements'));
const Reports = React.lazy(() => import('./pages/Reports'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Projects = React.lazy(() => import('./pages/Projects'));
const ProjectDetails = React.lazy(() => import('./pages/ProjectDetails'));
const Login = React.lazy(() => import('./pages/Login'));

export default function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Suspense fallback={<LoadingState />}>
      <Routes>
        <Route
          path='/login'
          element={!isAuthenticated ? <Login /> : <Navigate to='/dashboard' replace />}
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path='/' element={<Navigate to='/dashboard' replace />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/test-cases' element={<TestCases />} />
            <Route path='/requirements' element={<TestRequirements />} />
            <Route path='/reports' element={<Reports />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/projects/:projectId' element={<ProjectDetails />} />
          </Route>
        </Route>

        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </Suspense>
  );
}

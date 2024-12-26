import React from 'react';
import { Box } from '@chakra-ui/react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

// Lazy load pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

const Login = React.lazy(() => import('./pages/Login'));

export default function App() {
  return (
    <AuthProvider>
      <Box minH='100vh'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Navigate to='/dashboard' replace />} />
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Box>
    </AuthProvider>
  );
}

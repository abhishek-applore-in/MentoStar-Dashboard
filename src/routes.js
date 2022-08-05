import { useContext } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';


import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import { AuthContext } from './contexts/AuthContext';

// ----------------------------------------------------------------------

export default function Router() {

  const { currentUser } = useContext(AuthContext)

  const RequiredAuth = ({children}) => {
    return (
     currentUser ? (children) : <Navigate to="/login"/>
    ) 
  }
  
  console.log(currentUser)

  return useRoutes([
    {
      path: '/dashboard',
      element: <RequiredAuth><DashboardLayout/></RequiredAuth>,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'mentostar-profile', element: <User /> },
        { path: 'courses', element: <Products /> },
        // { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        // { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

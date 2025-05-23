import React from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import Login from './components/Auth/Login';
    import Dashboard from './components/Dashboard/Dashboard';
    import CompanyManagement from './components/Admin/CompanyManagement';
    import EmployeeManagement from './components/Admin/EmployeeManagement';
    import Reports from './components/Reports/Reports';
    import { Home, LayoutList, BarChart2, FileText, LogOut, Users } from 'lucide-react';

    function App() {
      const userRole = localStorage.getItem('userRole');
      const isAdmin = userRole === 'admin';

      const PrivateRoute = ({ children, roles }: { children: React.ReactNode; roles: string[] }) => {
        const isAuthenticated = !!userRole && roles.includes(userRole);
        return isAuthenticated ? (
          children
        ) : (
          <Navigate to="/login" replace />
        );
      };

      const Sidebar = () => (
        <div className="bg-gray-800 text-white w-64 h-screen py-4 px-2">
          <div className="flex items-center justify-center mb-6">
            <Home className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">OrgClima</span>
          </div>
          <nav>
            <ul>
              <li className="mb-2">
                <a href="/dashboard" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
                  <LayoutList className="h-5 w-5 mr-2" />
                  Dashboard
                </a>
              </li>
              <li className="mb-2">
                <a href="/reports" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
                  <FileText className="h-5 w-5 mr-2" />
                  Reports
                </a>
              </li>
              {isAdmin && (
                <>
                  <li className="mb-2">
                    <a href="/admin/companies" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
                      <BarChart2 className="h-5 w-5 mr-2" />
                      Company Management
                    </a>
                  </li>
                  <li className="mb-2">
                    <a href="/admin/employees" className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
                      <Users className="h-5 w-5 mr-2" />
                      Employee Management
                    </a>
                  </li>
                </>
              )}
              <li className="mt-4">
                <a href="/login" onClick={() => localStorage.removeItem('userRole')} className="flex items-center py-2 px-4 rounded hover:bg-gray-700">
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      );

      return (
        <Router>
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute roles={['admin', 'manager', 'user']}>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/reports"
                  element={
                    <PrivateRoute roles={['admin', 'manager', 'user']}>
                      <Reports />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/companies"
                  element={
                    <PrivateRoute roles={['admin']}>
                      <CompanyManagement />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/employees"
                  element={
                    <PrivateRoute roles={['admin']}>
                      <EmployeeManagement />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
          </div>
        </Router>
      );
    }

    export default App;

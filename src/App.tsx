import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import CompanyManagement from './components/Admin/CompanyManagement';
import EmployeeManagement from './components/Admin/EmployeeManagement';
import Reports from './components/Reports/Reports';
import { LayoutDashboard, Building, Users, BarChart2 } from 'lucide-react';

function App() {
  const location = useLocation();

  const sidebarLinks = [
    { path: '/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/companies', name: 'Gestão de Empresas', icon: Building },
    { path: '/admin/employees', name: 'Gestão de Usuários', icon: Users },
    { path: '/reports', name: 'Relatórios', icon: BarChart2 },
  ];

  // Basic check for admin role for admin routes (replace with proper auth logic)
  const userRole = localStorage.getItem('userRole');
  const isAdmin = userRole === 'admin';

  return (
    // Main container with red border
    <div className="flex flex-row h-screen border border-red-500">
      {/* Sidebar with blue border */}
      <div className="w-64 bg-gray-800 text-white p-4 flex flex-col border border-blue-500">
        <h2 className="text-xl font-bold mb-6">BER App</h2>
        <nav>
          <ul>
            {sidebarLinks.map((link) => {
              // Only show admin links if user is admin
              if (link.path.startsWith('/admin') && !isAdmin) {
                return null;
              }
              const isActive = location.pathname === link.path;
              return (
                <li key={link.path} className="mb-2">
                  <Link
                    to={link.path}
                    className={`flex items-center py-2 px-3 rounded-md ${
                      isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <link.icon className="h-5 w-5 mr-3" />
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {/* Add more sidebar content here */}
      </div>

      {/* Content Area with green border */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6 border border-green-500">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Protect admin routes - basic check */}
          {isAdmin && (
            <>
              <Route path="/admin/companies" element={<CompanyManagement />} />
              <Route path="/admin/employees" element={<EmployeeManagement />} />
            </>
          )}
          <Route path="/reports" element={<Reports />} />
          {/* Default route, maybe redirect to dashboard */}
          <Route path="/" element={<Dashboard />} />
          {/* Add a 404 route */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

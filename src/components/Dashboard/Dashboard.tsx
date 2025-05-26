import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { BarChart2, PieChart, TrendingUp, Users } from 'lucide-react';

    const Dashboard: React.FC = () => {
      const navigate = useNavigate();
      // NOTE: This is a basic example. Replace with proper authentication context.
      const userRole = localStorage.getItem('userRole');

      // Redirect if not authenticated (basic check)
      // if (!userRole) {
      //   navigate('/login'); // Assuming a login route exists
      //   return null;
      // }

      const isAdmin = userRole === 'admin';

      return (
        <div className="p-0"> {/* Removed padding as App.tsx content area has padding */}
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-2 text-blue-500" />
                  <span className="font-semibold text-gray-700">Total Employees</span>
                </div>
                <span className="text-2xl font-bold">150</span>
              </div>
              <p className="text-gray-500 text-sm">Number of employees in the system</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <TrendingUp className="h-6 w-6 mr-2 text-green-500" />
                  <span className="font-semibold text-gray-700">Overall Sentiment</span>
                </div>
                <span className="text-2xl font-bold">75%</span>
              </div>
              <p className="text-gray-500 text-sm">Positive sentiment score</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <BarChart2 className="h-6 w-6 mr-2 text-purple-500" />
                  <span className="font-semibold text-gray-700">Department Scores</span>
                </div>
                <span className="text-2xl font-bold">View</span>
              </div>
              <p className="text-gray-500 text-sm">Sentiment scores by department</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Sentiment Distribution</h2>
            <div className="bg-white rounded-lg shadow-md p-4">
              {/* Placeholder for Pie Chart */}
              <div className="flex items-center justify-center h-48 text-gray-400">
                 <PieChart className="h-12 w-12" />
                 <span className="ml-2">Pie Chart Placeholder</span>
              </div>
            </div>
          </div>

          {isAdmin && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">Admin Actions</h2>
              <div className="bg-white rounded-lg shadow-md p-4">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  onClick={() => navigate('/admin/companies')}
                >
                  Manage Companies
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                  onClick={() => navigate('/admin/employees')}
                >
                  Manage Employees
                </button>
              </div>
            </div>
          )}
        </div>
      );
    };

    export default Dashboard;

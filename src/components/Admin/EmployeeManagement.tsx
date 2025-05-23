import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Plus, Edit, Trash } from 'lucide-react';

    interface Employee {
      id: string;
      name: string;
      email: string;
      department: string;
      position: string;
    }

    const EmployeeManagement: React.FC = () => {
      const navigate = useNavigate();
      const [employees, setEmployees] = useState<Employee[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        const fetchEmployees = async () => {
          setLoading(true);
          setError(null);
          try {
            // Simulate API call
            const response = await new Promise<Employee[]>((resolve) => {
              setTimeout(() => {
                resolve([
                  { id: '1', name: 'John Doe', email: 'john.doe@example.com', department: 'IT', position: 'Developer' },
                  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', department: 'HR', position: 'HR Manager' },
                ]);
              }, 500);
            });
            setEmployees(response);
          } catch (err) {
            setError('Failed to fetch employees');
          } finally {
            setLoading(false);
          }
        };

        fetchEmployees();
      }, []);

      const handleAddEmployee = () => {
        // Implement logic to add a new employee
        alert('Add employee functionality will be implemented here.');
      };

      const handleEditEmployee = (employeeId: string) => {
        // Implement logic to edit an employee
        alert(`Edit employee with ID: ${employeeId}`);
      };

      const handleDeleteEmployee = (employeeId: string) => {
        // Implement logic to delete an employee
        alert(`Delete employee with ID: ${employeeId}`);
      };

      const userRole = localStorage.getItem('userRole');
      if (userRole !== 'admin') {
        navigate('/dashboard');
        return null;
      }

      return (
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Employee Management</h1>

          {loading && <p>Loading employees...</p>}
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleAddEmployee}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Employee
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditEmployee(employee.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEmployee(employee.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    };

    export default EmployeeManagement;

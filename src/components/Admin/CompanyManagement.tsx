import React, { useState, useEffect } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Plus, Edit, Trash } from 'lucide-react';

    interface Company {
      id: string;
      name: string;
      description: string;
    }

    const CompanyManagement: React.FC = () => {
      const navigate = useNavigate();
      const [companies, setCompanies] = useState<Company[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      // NOTE: This is a basic example. Replace with proper authentication context.
      const userRole = localStorage.getItem('userRole');
      if (userRole !== 'admin') {
        // Redirect if not admin
        navigate('/dashboard'); // Redirect to dashboard or a forbidden page
        return null;
      }


      useEffect(() => {
        const fetchCompanies = async () => {
          setLoading(true);
          setError(null);
          try {
            // Simulate API call - Replace with actual API call
            const response = await new Promise<Company[]>((resolve) => {
              setTimeout(() => {
                resolve([
                  { id: '1', name: 'Company A', description: 'Description for Company A' },
                  { id: '2', name: 'Company B', description: 'Description for Company B' },
                ]);
              }, 500);
            });
            setCompanies(response);
          } catch (err) {
            setError('Failed to fetch companies');
          } finally {
            setLoading(false);
          }
        };

        fetchCompanies();
      }, []);

      const handleAddCompany = () => {
        // Implement logic to add a new company
        alert('Add company functionality will be implemented here.');
      };

      const handleEditCompany = (companyId: string) => {
        // Implement logic to edit a company
        alert(`Edit company with ID: ${companyId}`);
      };

      const handleDeleteCompany = (companyId: string) => {
        // Implement logic to delete a company
        alert(`Delete company with ID: ${companyId}`);
      };


      return (
        <div className="p-0"> {/* Removed padding as App.tsx content area has padding */}
          <h1 className="text-2xl font-bold mb-4">Company Management</h1>

          {loading && <p>Loading companies...</p>}
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
              onClick={handleAddCompany}
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Company
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
                    Description
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {companies.map((company) => (
                  <tr key={company.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{company.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{company.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEditCompany(company.id)}
                        className="text-indigo-600 hover:text-indigo-900 mr-2"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCompany(company.id)}
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

    export default CompanyManagement;

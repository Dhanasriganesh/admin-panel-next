import React, { useState } from 'react'

function Employees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Sarah Wilson', email: 'sarah@company.com', role: 'Agent', status: 'Active' },
    { id: 2, name: 'Mike Johnson', email: 'mike@company.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Lisa Davis', email: 'lisa@company.com', role: 'Agent', status: 'Inactive' }
  ])
  const [filter, setFilter] = useState('all')

  const getStatusPill = (status) => status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-red-100 text-red-800'

  const filtered = employees.filter(e => filter === 'all' ? true : e.status.toLowerCase() === filter)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600">Manage employees, roles, and statuses</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors">Add Employee</button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded-full text-sm ${filter==='all'?'bg-primary/10 text-primary':'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>All</button>
          <button onClick={() => setFilter('active')} className={`px-3 py-1 rounded-full text-sm ${filter==='active'?'bg-primary/10 text-primary':'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Active</button>
          <button onClick={() => setFilter('inactive')} className={`px-3 py-1 rounded-full text-sm ${filter==='inactive'?'bg-primary/10 text-primary':'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Inactive</button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filtered.map((emp) => (
            <li key={emp.id}>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-primary">{emp.name.split(' ').map(n=>n[0]).join('')}</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{emp.name}</div>
                    <div className="text-sm text-gray-500">{emp.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-700">{emp.role}</span>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusPill(emp.status)}`}>{emp.status}</span>
                  <button className="text-primary text-sm hover:opacity-80">Edit</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Employees




import React, { useState } from 'react'

function Employees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Sarah Wilson', email: 'sarah@company.com', role: 'Agent', status: 'Active' },
    { id: 2, name: 'Mike Johnson', email: 'mike@company.com', role: 'Manager', status: 'Active' },
    { id: 3, name: 'Lisa Davis', email: 'lisa@company.com', role: 'Agent', status: 'Inactive' }
  ])
  const [filter, setFilter] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', phone: '', location: '' })

  const getStatusPill = (status) => status === 'Active' ? 'bg-primary/10 text-primary' : 'bg-red-100 text-red-800'

  const filtered = employees.filter(e => filter === 'all' ? true : e.status.toLowerCase() === filter)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600">Manage employees, roles, and statuses</p>
        </div>
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
          onClick={() => setShowCreateModal(true)}
        >
          Add Employee
        </button>
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
                    {emp.location && <div className="text-xs text-gray-400">{emp.location}</div>}
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

      {/* Create Employee Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
            <div className="mt-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Add Employee</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+1-555-0123"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={newEmployee.location}
                    onChange={(e) => setNewEmployee({ ...newEmployee, location: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="City, Country"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button onClick={() => setShowCreateModal(false)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
                <button
                  onClick={() => {
                    const nextId = (employees[employees.length - 1]?.id || 0) + 1
                    const created = { id: nextId, role: 'Agent', status: 'Active', ...newEmployee }
                    setEmployees([created, ...employees])
                    setShowCreateModal(false)
                    setNewEmployee({ name: '', email: '', phone: '', location: '' })
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90"
                >
                  Save Employee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Employees




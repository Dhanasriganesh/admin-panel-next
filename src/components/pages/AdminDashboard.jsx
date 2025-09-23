import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  const stats = [
    { name: 'Total Leads', value: '1,000', change: '1.5% up from this week', changeType: 'increase', href: '/leads', icon: '👥' },
    { name: 'Pending Approvals', value: '4,900', change: '1.3% up from past week', changeType: 'increase', href: '/approvals', icon: '✓' },
    { name: 'Total Revenue', value: '₹87,000', change: '4.3% Down from this week', changeType: 'decrease', href: '/payments', icon: '📈' },
    { name: 'Active Cities', value: '12', change: '1.8% up from this week', changeType: 'increase', href: '/reports', icon: '📁' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your Travel Agency Management System</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.name} to={stat.href} className="block">
            <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className={`text-sm ${
                      stat.changeType === 'increase' ? 'text-primary' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className="text-3xl">
                    {stat.icon}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Trends Chart */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Revenue Trends</h3>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-end justify-between space-x-2">
              {[
                { month: 'Jan', value: 25, height: 'h-16' },
                { month: 'Feb', value: 35, height: 'h-20' },
                { month: 'Mar', value: 30, height: 'h-18' },
                { month: 'Apr', value: 45, height: 'h-24' },
                { month: 'May', value: 40, height: 'h-22' },
                { month: 'Jun', value: 50, height: 'h-28' },
                { month: 'Jul', value: 87, height: 'h-32' },
                { month: 'Aug', value: 65, height: 'h-26' },
                { month: 'Sep', value: 55, height: 'h-24' },
                { month: 'Oct', value: 70, height: 'h-28' },
                { month: 'Nov', value: 60, height: 'h-25' },
                { month: 'Dec', value: 75, height: 'h-30' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-6 bg-primary rounded-t ${item.height} mb-2`}></div>
                  <span className="text-xs text-gray-500">{item.month}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Revenue in ₹ (Thousands)</p>
            </div>
          </div>
        </div>

        {/* City-wise Contributions Chart */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">City-wise Contributions</h3>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-end justify-between space-x-2">
              {[
                { city: 'Bangalore', value: 45, height: 'h-28' },
                { city: 'Delhi', value: 35, height: 'h-22' },
                { city: 'Vizag', value: 25, height: 'h-16' },
                { city: 'Chennai', value: 30, height: 'h-18' },
                { city: 'Hyderabad', value: 20, height: 'h-12' },
                { city: 'Pune', value: 15, height: 'h-10' }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className={`w-full bg-primary rounded-t ${item.height} mb-2`}></div>
                  <span className="text-xs text-gray-500 text-center">{item.city}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Contributions in ₹ (Thousands)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Pending Approvals</h3>
            <button className="text-sm text-primary hover:opacity-80">View all</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name/ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City/Division</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                    <span className="text-sm text-gray-900">Volunteer</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Rajesh Shah - SCI02467</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Hyderabad - Engineering Unit</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">02 August 2025</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button className="bg-primary text-white px-3 py-1 rounded text-sm hover:opacity-90">
                      Approve
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

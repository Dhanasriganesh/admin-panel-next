import React, { useState } from 'react'

function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  const leadSources = [
    { source: 'Google Ads', count: 245, percentage: 35, revenue: 12500 },
    { source: 'Website', count: 180, percentage: 26, revenue: 9800 },
    { source: 'WhatsApp', count: 150, percentage: 21, revenue: 7500 },
    { source: 'Phone', count: 125, percentage: 18, revenue: 6200 }
  ]

  const agentPerformance = [
    { name: 'Sarah Wilson', leads: 45, bookings: 12, revenue: 15600, conversion: 26.7 },
    { name: 'Mike Johnson', leads: 38, bookings: 15, revenue: 18900, conversion: 39.5 },
    { name: 'Lisa Davis', leads: 42, bookings: 11, revenue: 14200, conversion: 26.2 },
    { name: 'David Brown', leads: 35, bookings: 9, revenue: 11800, conversion: 25.7 }
  ]

  const monthlyRevenue = [
    { month: 'Jan', revenue: 12500, bookings: 12 },
    { month: 'Feb', revenue: 18900, bookings: 18 },
    { month: 'Mar', revenue: 14200, bookings: 14 },
    { month: 'Apr', revenue: 21800, bookings: 22 },
    { month: 'May', revenue: 16200, bookings: 16 },
    { month: 'Jun', revenue: 19500, bookings: 19 }
  ]

  const packagePerformance = [
    { package: 'Bali Adventure', bookings: 15, revenue: 37500, avgPrice: 2500 },
    { package: 'European Tour', bookings: 12, revenue: 50400, avgPrice: 4200 },
    { package: 'Thailand Discovery', bookings: 18, revenue: 32400, avgPrice: 1800 },
    { package: 'Japan Experience', bookings: 8, revenue: 25600, avgPrice: 3200 },
    { package: 'Dubai Luxury', bookings: 6, revenue: 24000, avgPrice: 4000 }
  ]

  const getConversionColor = (rate) => {
    if (rate >= 35) return 'text-primary'
    if (rate >= 25) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Track performance and business insights</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">L</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Leads</dt>
                  <dd className="text-lg font-medium text-gray-900">700</dd>
                  <dd className="text-sm text-primary">+12% from last month</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">✓</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Conversion Rate</dt>
                  <dd className="text-lg font-medium text-gray-900">27.1%</dd>
                  <dd className="text-sm text-primary">+3.2% from last month</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">$</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="text-lg font-medium text-gray-900">$103,400</dd>
                  <dd className="text-sm text-primary">+18% from last month</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">📊</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Avg. Booking Value</dt>
                  <dd className="text-lg font-medium text-gray-900">$2,890</dd>
                  <dd className="text-sm text-green-600">+5% from last month</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Lead Sources */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Lead Sources Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {leadSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{source.source}</span>
                      <span className="text-sm text-gray-500">{source.count} leads</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">{source.percentage}%</span>
                      <span className="text-xs text-gray-500">${source.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Agent Performance */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Agent Performance</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {agentPerformance.map((agent, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{agent.name}</span>
                      <span className={`text-sm font-semibold ${getConversionColor(agent.conversion)}`}>
                        {agent.conversion}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{agent.leads} leads</span>
                      <span>{agent.bookings} bookings</span>
                      <span>${agent.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Monthly Revenue Trend</h3>
        </div>
        <div className="p-6">
          <div className="flex items-end space-x-4 h-64">
            {monthlyRevenue.map((month, index) => {
              const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue))
              const height = (month.revenue / maxRevenue) * 200
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-primary/10 rounded-t-lg flex flex-col justify-end" style={{ height: `${height}px` }}>
                    <div className="bg-primary rounded-t-lg w-full h-full"></div>
                  </div>
                  <div className="mt-2 text-center">
                    <div className="text-sm font-medium text-gray-900">{month.month}</div>
                    <div className="text-xs text-gray-500">${month.revenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">{month.bookings} bookings</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Package Performance */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Package Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Package
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bookings
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {packagePerformance.map((pkg, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {pkg.package}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {pkg.bookings}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${pkg.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${pkg.avgPrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div
                        className="bg-primary h-2 rounded-full"
                          style={{ width: `${(pkg.bookings / Math.max(...packagePerformance.map(p => p.bookings))) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {((pkg.bookings / packagePerformance.reduce((sum, p) => sum + p.bookings, 0)) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Key Insights</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Top Performing Source</h4>
              <p className="text-sm text-blue-700">
                Google Ads generates 35% of all leads and $12,500 in revenue this month. 
                Consider increasing budget allocation.
              </p>
            </div>
            <div className="p-4 bg-primary/10 rounded-lg">
              <h4 className="font-medium text-primary mb-2">Best Converting Agent</h4>
              <p className="text-sm text-primary">
                Mike Johnson has the highest conversion rate at 39.5%. 
                Study his approach for team training.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Growth Opportunity</h4>
              <p className="text-sm text-yellow-700">
                Phone leads have lower volume but good conversion. 
                Consider expanding call center hours.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900 mb-2">Package Insights</h4>
              <p className="text-sm text-purple-700">
                Thailand Discovery has the most bookings. 
                Consider creating similar budget-friendly packages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports

import React, { useState } from 'react'

interface NavigationItem {
  name: string
  key: string
}

interface AssignedItem {
  name: string
  note: string
}

const Employeedashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  
  const navigation: NavigationItem[] = [
    { name: 'Overview', key: 'overview' },
    { name: 'Assigned To', key: 'assigned' },
    { name: 'Tasks', key: 'tasks' },
    { name: 'Messages', key: 'messages' },
    { name: 'Settings', key: 'settings' }
  ]

  const assignedItems: AssignedItem[] = [
    { name: 'John Doe', note: 'Follow up on itinerary' },
    { name: 'Jane Smith', note: 'Share pricing options' }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-56 bg-white shadow-xl transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="h-14 border-b border-gray-100 flex items-center px-4">
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-semibold">E</div>
          <div className="ml-3">
            <div className="text-xs text-gray-500">Employee</div>
            <div className="text-sm font-semibold text-gray-900">Dashboard</div>
          </div>
        </div>
        <nav className="p-3 space-y-2">
          {navigation.map(item => (
            <button
              key={item.key}
              className={`w-full text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-50 ${
                item.key === 'assigned' ? 'bg-primary/10 text-primary' : 'text-gray-700'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="h-7 w-7 bg-primary rounded-full flex items-center justify-center text-white text-xs">E</div>
            <div>
              <p className="text-sm font-medium text-gray-900">Employee</p>
              <p className="text-[11px] text-gray-500">Logged in</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col md:ml-56">
        {/* Header */}
        <header className="bg-white border-b border-gray-100">
          <div className="h-14 px-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                className="md:hidden text-gray-500" 
                onClick={() => setSidebarOpen(s => !s)}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-base font-semibold text-gray-900">Employee Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input 
                  className="pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" 
                  placeholder="Search" 
                />
              </div>
              <div className="h-7 w-7 bg-primary rounded-full flex items-center justify-center text-white text-xs">E</div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-4">
          <div className="mx-auto w-[92%] lg:w-4/5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-sm text-gray-500">Assigned Leads</div>
                <div className="text-xl font-bold text-gray-900">12</div>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-sm text-gray-500">Upcoming Tasks</div>
                <div className="text-xl font-bold text-gray-900">5</div>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-sm text-gray-500">Messages</div>
                <div className="text-xl font-bold text-gray-900">3</div>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <div className="text-sm text-gray-500">Conversions</div>
                <div className="text-xl font-bold text-gray-900">2</div>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg">
              <div className="px-4 py-3 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-900">Assigned To You</h2>
              </div>
              <div className="p-4">
                <ul className="divide-y divide-gray-100">
                  {assignedItems.map((item, idx) => (
                    <li key={idx} className="py-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.note}</div>
                      </div>
                      <button className="text-primary text-sm hover:opacity-80">Open</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Employeedashboard

import React, { useState, useEffect } from 'react'

interface Package {
  id: number
  name: string
  destination: string
  duration: string
  price: number
  original_price: number
  description: string
  highlights: string[]
  includes: string[]
  category: string
  status: 'Active' | 'Inactive' | 'Draft'
  featured: boolean
  image: string
  created_at: string
  bookings: number
  route?: string
  nights?: number
  days?: number
  trip_type?: 'custom' | 'group'
}

interface NewPackage {
  name: string
  destination: string
  duration: string
  price: number
  originalPrice: number
  description: string
  highlights: string
  includes: string
  category: string
  featured: boolean
  route?: string
  nights?: number
  days?: number
  tripType?: 'custom' | 'group'
}

type FilterType = 'all' | 'active' | 'inactive' | 'draft'

const Packages: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [showModal, setShowModal] = useState<boolean>(false)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [filter, setFilter] = useState<FilterType>('all')
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [newPackage, setNewPackage] = useState<NewPackage>({
    name: '',
    destination: '',
    duration: '',
    price: 0,
    originalPrice: 0,
    description: '',
    highlights: '',
    includes: '',
    category: 'Adventure',
    featured: false,
    route: '',
    nights: 0,
    days: 0,
    tripType: 'custom'
  })

  // Fetch packages from API
  const fetchPackages = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/packages')
      const data = await response.json()
      
      if (response.ok) {
        setPackages(data.packages || [])
        setError(null)
      } else {
        setError(data.error || 'Failed to fetch packages')
      }
    } catch (err) {
      setError('Failed to fetch packages')
      console.error('Error fetching packages:', err)
    } finally {
      setLoading(false)
    }
  }

  // Create new package
  const createPackage = async (packageData: NewPackage) => {
    try {
      const response = await fetch('/api/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packageData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        await fetchPackages() // Refresh the list
        return { success: true, package: data.package }
      } else {
        return { success: false, error: data.error }
      }
    } catch (err) {
      return { success: false, error: 'Failed to create package' }
    }
  }

  // Update package
  const updatePackage = async (id: number, packageData: Partial<Package>) => {
    try {
      const response = await fetch(`/api/packages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(packageData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        await fetchPackages() // Refresh the list
        return { success: true, package: data.package }
      } else {
        return { success: false, error: data.error }
      }
    } catch (err) {
      return { success: false, error: 'Failed to update package' }
    }
  }

  // Delete package
  const deletePackage = async (id: number) => {
    try {
      const response = await fetch(`/api/packages/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        await fetchPackages() // Refresh the list
        return { success: true }
      } else {
        const data = await response.json()
        return { success: false, error: data.error }
      }
    } catch (err) {
      return { success: false, error: 'Failed to delete package' }
    }
  }

  // Load packages on component mount
  useEffect(() => {
    fetchPackages()
  }, [])

  const filteredPackages = packages.filter(pkg => {
    if (filter === 'all') return true
    return pkg.status.toLowerCase() === filter.toLowerCase()
  })

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Active': return 'bg-primary/10 text-primary'
      case 'Inactive': return 'bg-red-100 text-red-800'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Adventure': return 'bg-green-100 text-green-800'
      case 'Cultural': return 'bg-blue-100 text-blue-800'
      case 'Luxury': return 'bg-purple-100 text-purple-800'
      case 'Beach': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const openPackageDetails = (pkg: Package): void => {
    setSelectedPackage(pkg)
    setShowModal(true)
  }

  const handleCreatePackage = async (): Promise<void> => {
    const packageData = {
      ...newPackage,
      highlights: newPackage.highlights ? newPackage.highlights.split(',').map(h => h.trim()) : [],
      includes: newPackage.includes ? newPackage.includes.split(',').map(i => i.trim()) : [],
      status: 'Active' as const
    }
    
    const result = await createPackage(packageData)
    
    if (result.success) {
      setShowCreateModal(false)
      setNewPackage({
        name: '',
        destination: '',
        duration: '',
        price: 0,
        originalPrice: 0,
        description: '',
        highlights: '',
        includes: '',
        category: 'Adventure',
        featured: false,
        route: '',
        nights: 0,
        days: 0,
        tripType: 'custom'
      })
    } else {
      alert(`Failed to create package: ${result.error}`)
    }
  }

  const totalRevenue = packages
    .filter(p => p.status === 'Active')
    .reduce((sum, pkg) => sum + (pkg.price * pkg.bookings), 0)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading packages...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Packages</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchPackages}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Package Management</h1>
          <p className="text-gray-600">Create and manage travel packages</p>
        </div>
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors"
          onClick={() => setShowCreateModal(true)}
        >
          Create New Package
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">📦</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Packages</dt>
                  <dd className="text-lg font-medium text-gray-900">{packages.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">✓</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active</dt>
                  <dd className="text-lg font-medium text-gray-900">{packages.filter(p => p.status === 'Active').length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">⭐</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Featured</dt>
                  <dd className="text-lg font-medium text-gray-900">{packages.filter(p => p.featured).length}</dd>
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
                  <span className="text-white text-sm font-medium">💰</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                  <dd className="text-lg font-medium text-gray-900">${totalRevenue.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({packages.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'active' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Active ({packages.filter(p => p.status === 'Active').length})
          </button>
          <button
            onClick={() => setFilter('inactive')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'inactive' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Inactive ({packages.filter(p => p.status === 'Inactive').length})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === 'draft' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Drafts ({packages.filter(p => p.status === 'Draft').length})
          </button>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 bg-gray-200 flex items-center justify-center relative">
              <span className="text-gray-500">Package Image</span>
              {pkg.featured && (
                <div className="absolute top-2 right-2">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                  {pkg.status}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(pkg.category)}`}>
                  {pkg.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{pkg.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{pkg.destination}</p>
              <p className="text-gray-500 text-xs mb-4">{pkg.duration}</p>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-lg font-bold text-primary">${pkg.price.toLocaleString()}</span>
                  {pkg.original_price > pkg.price && (
                    <span className="text-sm text-gray-500 line-through ml-2">${pkg.original_price.toLocaleString()}</span>
                  )}
                </div>
                <span className="text-sm text-gray-500">{pkg.bookings} bookings</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openPackageDetails(pkg)}
                  className="flex-1 bg-primary text-white px-3 py-2 rounded text-sm hover:opacity-90"
                >
                  View
                </button>
                <button className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-300">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Package Details Modal */}
      {showModal && selectedPackage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Package Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <p className="text-sm text-gray-900">{selectedPackage.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Destination</label>
                  <p className="text-sm text-gray-900">{selectedPackage.destination}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <p className="text-sm text-gray-900">{selectedPackage.duration}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <p className="text-sm text-gray-900">
                    ${selectedPackage.price.toLocaleString()}
                    {selectedPackage.original_price > selectedPackage.price && (
                      <span className="text-gray-500 line-through ml-2">${selectedPackage.original_price.toLocaleString()}</span>
                    )}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <p className="text-sm text-gray-900">{selectedPackage.category}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="text-sm text-gray-900">{selectedPackage.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Highlights</label>
                  <ul className="text-sm text-gray-900 list-disc list-inside">
                    {selectedPackage.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Includes</label>
                  <ul className="text-sm text-gray-900 list-disc list-inside">
                    {selectedPackage.includes.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Stats</label>
                  <p className="text-sm text-gray-900">Bookings: {selectedPackage.bookings} • Created: {selectedPackage.created_at}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90">
                  Edit Package
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Package Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Create New Package</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                    <input
                      type="text"
                      value={newPackage.name}
                      onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Package name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                    <input
                      type="text"
                      value={newPackage.destination}
                      onChange={(e) => setNewPackage({ ...newPackage, destination: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Destination"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={newPackage.duration}
                      onChange={(e) => setNewPackage({ ...newPackage, duration: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., 7 days / 6 nights"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newPackage.category}
                      onChange={(e) => setNewPackage({ ...newPackage, category: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Adventure">Adventure</option>
                      <option value="Cultural">Cultural</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Beach">Beach</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nights</label>
                    <input
                      type="number"
                      value={newPackage.nights}
                      onChange={(e) => setNewPackage({ ...newPackage, nights: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="6"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Days</label>
                    <input
                      type="number"
                      value={newPackage.days}
                      onChange={(e) => setNewPackage({ ...newPackage, days: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="7"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Trip Type</label>
                    <select
                      value={newPackage.tripType}
                      onChange={(e) => setNewPackage({ ...newPackage, tripType: e.target.value as 'custom' | 'group' })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="custom">Custom Trip</option>
                      <option value="group">Group Departure</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                  <input
                    type="text"
                    value={newPackage.route}
                    onChange={(e) => setNewPackage({ ...newPackage, route: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Srinagar → Gulmarg → Pahalgam"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                      type="number"
                      value={newPackage.price}
                      onChange={(e) => setNewPackage({ ...newPackage, price: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
                    <input
                      type="number"
                      value={newPackage.originalPrice}
                      onChange={(e) => setNewPackage({ ...newPackage, originalPrice: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newPackage.description}
                    onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Package description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Highlights (comma-separated)</label>
                  <textarea
                    rows={3}
                    value={newPackage.highlights}
                    onChange={(e) => setNewPackage({ ...newPackage, highlights: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Highlight 1, Highlight 2, Highlight 3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Includes (comma-separated)</label>
                  <textarea
                    rows={3}
                    value={newPackage.includes}
                    onChange={(e) => setNewPackage({ ...newPackage, includes: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Item 1, Item 2, Item 3"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newPackage.featured}
                    onChange={(e) => setNewPackage({ ...newPackage, featured: e.target.checked })}
                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">Featured Package</label>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePackage}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90"
                >
                  Create Package
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Packages

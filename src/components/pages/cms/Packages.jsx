import React, { useState } from 'react'

function Packages() {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Bali Adventure',
      destination: 'Bali, Indonesia',
      duration: '7 days / 6 nights',
      price: 2500,
      originalPrice: 3000,
      description: 'Experience the beauty of Bali with stunning beaches, ancient temples, and vibrant culture.',
      highlights: ['Visit Ubud Monkey Forest', 'Sunset at Tanah Lot', 'Traditional Balinese cooking class', 'Snorkeling at Nusa Penida'],
      includes: ['Accommodation', 'Breakfast', 'Airport transfers', 'Local guide', 'Entrance fees'],
      category: 'Adventure',
      status: 'Active',
      featured: true,
      image: '/api/placeholder/400/300',
      createdAt: '2024-01-10',
      bookings: 15
    },
    {
      id: 2,
      name: 'European Grand Tour',
      destination: 'Paris, Rome, Barcelona',
      duration: '10 days / 9 nights',
      price: 4200,
      originalPrice: 4800,
      description: 'Discover the best of Europe with visits to three iconic cities.',
      highlights: ['Eiffel Tower in Paris', 'Colosseum in Rome', 'Sagrada Familia in Barcelona', 'Guided city tours'],
      includes: ['4-star hotels', 'Daily breakfast', 'Train tickets', 'City passes', 'Professional guide'],
      category: 'Cultural',
      status: 'Active',
      featured: true,
      image: '/api/placeholder/400/300',
      createdAt: '2024-01-08',
      bookings: 12
    },
    {
      id: 3,
      name: 'Thailand Discovery',
      destination: 'Bangkok, Chiang Mai',
      duration: '8 days / 7 nights',
      price: 1800,
      originalPrice: 2200,
      description: 'Explore the vibrant culture and stunning landscapes of Thailand.',
      highlights: ['Floating markets', 'Elephant sanctuary', 'Temple visits', 'Street food tour'],
      includes: ['3-star hotels', 'Breakfast', 'Domestic flights', 'Activities', 'Local guide'],
      category: 'Cultural',
      status: 'Active',
      featured: false,
      image: '/api/placeholder/400/300',
      createdAt: '2024-01-05',
      bookings: 18
    },
    {
      id: 4,
      name: 'Japan Experience',
      destination: 'Tokyo, Kyoto, Osaka',
      duration: '12 days / 11 nights',
      price: 3200,
      originalPrice: 3600,
      description: 'Immerse yourself in Japanese culture, technology, and natural beauty.',
      highlights: ['Tokyo city tour', 'Traditional Kyoto', 'Osaka food scene', 'Bullet train experience'],
      includes: ['4-star hotels', 'Breakfast', 'JR Pass', 'City guides', 'Cultural activities'],
      category: 'Cultural',
      status: 'Draft',
      featured: false,
      image: '/api/placeholder/400/300',
      createdAt: '2024-01-12',
      bookings: 8
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [filter, setFilter] = useState('all')
  const [category, setCategory] = useState('all')

  const filteredPackages = packages.filter(pkg => {
    const statusMatch = filter === 'all' || pkg.status.toLowerCase() === filter.toLowerCase()
    const categoryMatch = category === 'all' || pkg.category.toLowerCase() === category.toLowerCase()
    return statusMatch && categoryMatch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-primary/10 text-primary'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      case 'Archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Adventure': return 'bg-primary/10 text-primary'
      case 'Cultural': return 'bg-purple-100 text-purple-800'
      case 'Luxury': return 'bg-gold-100 text-gold-800'
      case 'Budget': return 'bg-primary/10 text-primary'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const openPackageDetails = (pkg) => {
    setSelectedPackage(pkg)
    setShowModal(true)
  }

  const toggleFeatured = (packageId) => {
    setPackages(packages.map(pkg => 
      pkg.id === packageId ? { ...pkg, featured: !pkg.featured } : pkg
    ))
  }

  const toggleStatus = (packageId, newStatus) => {
    setPackages(packages.map(pkg => 
      pkg.id === packageId ? { ...pkg, status: newStatus } : pkg
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Travel Packages</h1>
          <p className="text-gray-600">Manage your travel packages and itineraries</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors">
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
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
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
                <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
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
                  <span className="text-white text-sm font-medium">📊</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                  <dd className="text-lg font-medium text-gray-900">{packages.reduce((sum, p) => sum + p.bookings, 0)}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'all' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Status
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
              onClick={() => setFilter('draft')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'draft' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Draft ({packages.filter(p => p.status === 'Draft').length})
            </button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setCategory('all')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                category === 'all' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Categories
            </button>
            <button
              onClick={() => setCategory('adventure')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                category === 'adventure' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Adventure ({packages.filter(p => p.category === 'Adventure').length})
            </button>
            <button
              onClick={() => setCategory('cultural')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                category === 'cultural' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Cultural ({packages.filter(p => p.category === 'Cultural').length})
            </button>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPackages.map((pkg) => (
          <div key={pkg.id} className="bg-white shadow rounded-lg overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Package Image</span>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{pkg.name}</h3>
                <button
                  onClick={() => toggleFeatured(pkg.id)}
                  className={`p-1 rounded-full ${pkg.featured ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  ⭐
                </button>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{pkg.destination}</p>
              <p className="text-xs text-gray-500 mb-3">{pkg.duration}</p>
              
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-lg font-bold text-gray-900">${pkg.price.toLocaleString()}</span>
                  {pkg.originalPrice > pkg.price && (
                    <span className="text-sm text-gray-500 line-through ml-2">${pkg.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">{pkg.bookings} bookings</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(pkg.category)}`}>
                  {pkg.category}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(pkg.status)}`}>
                  {pkg.status}
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => openPackageDetails(pkg)}
                  className="flex-1 bg-primary text-white text-sm py-2 px-3 rounded hover:opacity-90 transition-colors"
                >
                  View Details
                </button>
                <select
                  value={pkg.status}
                  onChange={(e) => toggleStatus(pkg.id, e.target.value)}
                  className="text-xs border border-gray-300 rounded px-2 py-1"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Package Details Modal */}
      {showModal && selectedPackage && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Package Name</label>
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
                    <p className="text-sm text-gray-900">${selectedPackage.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="text-sm text-gray-900">{selectedPackage.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="text-sm text-gray-900">{selectedPackage.status}</p>
                  </div>
                </div>

                <div className="space-y-4">
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
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90">
                  Duplicate
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

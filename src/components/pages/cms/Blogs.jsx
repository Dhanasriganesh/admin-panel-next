import React, { useState } from 'react'

function Blogs() {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: '10 Must-Visit Destinations in Bali',
      slug: '10-must-visit-destinations-bali',
      excerpt: 'Discover the most beautiful places to visit in Bali, from stunning beaches to ancient temples.',
      content: 'Full blog content here...',
      author: 'Sarah Wilson',
      category: 'Destinations',
      tags: ['Bali', 'Travel Tips', 'Destinations'],
      status: 'Published',
      featured: true,
      image: '/api/placeholder/400/300',
      publishDate: '2024-01-15',
      views: 1250,
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: 'Complete Guide to European Travel',
      slug: 'complete-guide-european-travel',
      excerpt: 'Everything you need to know before planning your European adventure.',
      content: 'Full blog content here...',
      author: 'Mike Johnson',
      category: 'Travel Tips',
      tags: ['Europe', 'Travel Guide', 'Planning'],
      status: 'Published',
      featured: false,
      image: '/api/placeholder/400/300',
      publishDate: '2024-01-12',
      views: 890,
      likes: 32,
      comments: 8
    },
    {
      id: 3,
      title: 'Thailand Street Food Guide',
      slug: 'thailand-street-food-guide',
      excerpt: 'Explore the vibrant street food scene in Bangkok and beyond.',
      content: 'Full blog content here...',
      author: 'Lisa Davis',
      category: 'Food & Culture',
      tags: ['Thailand', 'Food', 'Culture'],
      status: 'Published',
      featured: true,
      image: '/api/placeholder/400/300',
      publishDate: '2024-01-10',
      views: 1560,
      likes: 67,
      comments: 15
    },
    {
      id: 4,
      title: 'Budget Travel Tips for Japan',
      slug: 'budget-travel-tips-japan',
      excerpt: 'How to explore Japan without breaking the bank.',
      content: 'Full blog content here...',
      author: 'David Brown',
      category: 'Budget Travel',
      tags: ['Japan', 'Budget', 'Travel Tips'],
      status: 'Draft',
      featured: false,
      image: '/api/placeholder/400/300',
      publishDate: null,
      views: 0,
      likes: 0,
      comments: 0
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [filter, setFilter] = useState('all')
  const [category, setCategory] = useState('all')

  const filteredBlogs = blogs.filter(blog => {
    const statusMatch = filter === 'all' || blog.status.toLowerCase() === filter.toLowerCase()
    const categoryMatch = category === 'all' || blog.category.toLowerCase() === category.toLowerCase()
    return statusMatch && categoryMatch
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'bg-primary/10 text-primary'
      case 'Draft': return 'bg-yellow-100 text-yellow-800'
      case 'Archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Destinations': return 'bg-primary/10 text-primary'
      case 'Travel Tips': return 'bg-primary/10 text-primary'
      case 'Food & Culture': return 'bg-purple-100 text-purple-800'
      case 'Budget Travel': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const openBlogDetails = (blog) => {
    setSelectedBlog(blog)
    setShowModal(true)
  }

  const toggleFeatured = (blogId) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId ? { ...blog, featured: !blog.featured } : blog
    ))
  }

  const toggleStatus = (blogId, newStatus) => {
    setBlogs(blogs.map(blog => 
      blog.id === blogId ? { ...blog, status: newStatus } : blog
    ))
  }

  const formatDate = (date) => {
    if (!date) return 'Not published'
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
          <p className="text-gray-600">Manage your travel blog posts and content</p>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors">
          Write New Post
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white text-sm font-medium">📝</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Posts</dt>
                  <dd className="text-lg font-medium text-gray-900">{blogs.length}</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Published</dt>
                  <dd className="text-lg font-medium text-gray-900">{blogs.filter(b => b.status === 'Published').length}</dd>
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
                  <span className="text-white text-sm font-medium">👁</span>
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Views</dt>
                  <dd className="text-lg font-medium text-gray-900">{blogs.reduce((sum, b) => sum + b.views, 0).toLocaleString()}</dd>
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
                  <dd className="text-lg font-medium text-gray-900">{blogs.filter(b => b.featured).length}</dd>
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
              onClick={() => setFilter('published')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'published' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Published ({blogs.filter(b => b.status === 'Published').length})
            </button>
            <button
              onClick={() => setFilter('draft')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === 'draft' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Draft ({blogs.filter(b => b.status === 'Draft').length})
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
              onClick={() => setCategory('destinations')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                category === 'destinations' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Destinations ({blogs.filter(b => b.category === 'Destinations').length})
            </button>
            <button
              onClick={() => setCategory('travel tips')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                category === 'travel tips' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Travel Tips ({blogs.filter(b => b.category === 'Travel Tips').length})
            </button>
          </div>
        </div>
      </div>

      {/* Blogs List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredBlogs.map((blog) => (
            <li key={blog.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-24 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-500 text-xs">Image</span>
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-medium text-gray-900">{blog.title}</h3>
                        <button
                          onClick={() => toggleFeatured(blog.id)}
                          className={`p-1 rounded-full ${blog.featured ? 'text-yellow-500' : 'text-gray-300'}`}
                        >
                          ⭐
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{blog.excerpt}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>By {blog.author}</span>
                        <span>•</span>
                        <span>{formatDate(blog.publishDate)}</span>
                        <span>•</span>
                        <span>{blog.views} views</span>
                        <span>•</span>
                        <span>{blog.likes} likes</span>
                        <span>•</span>
                        <span>{blog.comments} comments</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(blog.category)}`}>
                          {blog.category}
                        </span>
                        <div className="flex space-x-1">
                          {blog.tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(blog.status)}`}>
                      {blog.status}
                    </span>
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => openBlogDetails(blog)}
                        className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                      >
                        View
                      </button>
                      <select
                        value={blog.status}
                        onChange={(e) => toggleStatus(blog.id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-1 py-1"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                        <option value="Archived">Archived</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Blog Details Modal */}
      {showModal && selectedBlog && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Blog Post Details</h3>
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
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <p className="text-sm text-gray-900">{selectedBlog.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Slug</label>
                    <p className="text-sm text-gray-900">{selectedBlog.slug}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Author</label>
                    <p className="text-sm text-gray-900">{selectedBlog.author}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <p className="text-sm text-gray-900">{selectedBlog.category}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="text-sm text-gray-900">{selectedBlog.status}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Publish Date</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedBlog.publishDate)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                    <p className="text-sm text-gray-900">{selectedBlog.excerpt}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tags</label>
                    <div className="flex flex-wrap gap-1">
                      {selectedBlog.tags.map((tag, index) => (
                        <span key={index} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Engagement</label>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{selectedBlog.views.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">Views</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{selectedBlog.likes}</div>
                        <div className="text-xs text-gray-500">Likes</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">{selectedBlog.comments}</div>
                        <div className="text-xs text-gray-500">Comments</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Content Preview</label>
                    <p className="text-sm text-gray-900 max-h-32 overflow-y-auto">
                      {selectedBlog.content}
                    </p>
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
                  Edit Post
                </button>
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:opacity-90">
                  View Live
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blogs

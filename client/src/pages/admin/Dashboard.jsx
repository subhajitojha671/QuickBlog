import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { assets } from '../../assets/assets'
import BlogTableitem from '../../components/admin/BlogTableitem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({ blogs: 0, comments: 0, drafts: 0, recentBlogs: [] })
  const { axios } = useAppContext();

  const fetchDashboard = async () => {
    try {
      const { data } = await axios.get('/api/admin/dashboard')
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
    } catch (error) { toast.error(error.message) }
  }

  useEffect(() => { fetchDashboard() }, [])

  return (
    <div className='p-6 md:p-10'>
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10'
      >
        {[
          { label: 'Total Blogs', count: dashboardData.blogs, icon: assets.dashboard_icon_1 },
          { label: 'Comments', count: dashboardData.comments, icon: assets.dashboard_icon_2 },
          { label: 'Drafts', count: dashboardData.drafts, icon: assets.dashboard_icon_3 }
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -4 }}
            className='bg-white p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 sm:gap-6'
          >
            <div className='w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gray-50 flex items-center justify-center shrink-0'>
              <img src={stat.icon} alt='' className='w-6 opacity-70' />
            </div>
            <div>
              <p className='text-3xl font-bold text-gray-900'>{stat.count}</p>
              <p className='text-sm text-gray-500 font-medium'>{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className='mb-6'>
        <h2 className='text-lg font-bold text-gray-900 flex items-center gap-2'>
          <img src={assets.dashboard_icon_4} alt='' className='w-5 opacity-50' />
          Recent Publications
        </h2>
      </div>

      <div className='bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden'>
        <div className="overflow-x-auto">
          <table className='w-full text-sm text-left whitespace-nowrap'>
            <thead className='text-xs text-gray-500 uppercase bg-gray-50/50 border-b border-gray-100'>
              <tr>
                <th scope='col' className='px-6 py-4 font-medium'>#</th>
                <th scope='col' className='px-6 py-4 font-medium'>Blog Title</th>
                <th scope='col' className='px-6 py-4 font-medium max-sm:hidden'>Date</th>
                <th scope='col' className='px-6 py-4 font-medium max-sm:hidden'>Status</th>
                <th scope='col' className='px-6 py-4 font-medium'>Action</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {dashboardData.recentBlogs.map((blog, index) => (
                <BlogTableitem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
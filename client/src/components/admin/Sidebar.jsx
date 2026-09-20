import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../../assets/assets'

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center justify-center md:justify-start gap-3 py-3 px-3 md:px-4 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-primary text-white shadow-md"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`;

  return (
    <div className='w-16 md:w-64 shrink-0 min-h-screen border-r border-gray-200 bg-white pt-6 shadow-sm transition-all duration-200'>
      <div className='flex flex-col gap-2 px-2 md:px-4'>
        <NavLink end={true} to='/admin' className={linkClasses} title="Dashboard">
          <img src={assets.home_icon} alt="Home" className='w-5 shrink-0' />
          <p className='hidden md:inline-block font-medium'>Dashboard</p>
        </NavLink>

        <NavLink to='/admin/addBlog' className={linkClasses} title="Add Blogs">
          <img src={assets.add_icon} alt="Add" className='w-5 shrink-0' />
          <p className='hidden md:inline-block font-medium'>Add Blogs</p>
        </NavLink>

        <NavLink to='/admin/listBlog' className={linkClasses} title="Blog Lists">
          <img src={assets.list_icon} alt="List" className='w-5 shrink-0' />
          <p className='hidden md:inline-block font-medium'>Blog Lists</p>
        </NavLink>

        <NavLink to='/admin/comments' className={linkClasses} title="Comments">
          <img src={assets.comment_icon} alt="Comments" className='w-5 shrink-0' />
          <p className='hidden md:inline-block font-medium'>Comments</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
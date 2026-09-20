import React, { useState } from 'react'
import { blogCategories } from '../assets/assets'
import { motion, AnimatePresence } from "framer-motion"
import BlogCard from './BlogCard'
import { useAppContext } from '../context/AppContext'

const BlogList = () => {
  const [menu, setMenu] = useState("All")
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === '') return blogs;
    return blogs.filter((blog) => blog.title.toLowerCase().includes(input.toLowerCase()) || blog.category.toLowerCase().includes(input.toLowerCase()))
  }

  const visibleBlogs = filteredBlogs().filter((blog) => menu === "All" ? true : blog.category === menu);

  return (
    <div className='mx-6 sm:mx-16 xl:mx-32'>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='flex flex-wrap justify-center gap-2 sm:gap-4 my-12'
      >
        {blogCategories.map((item) => (
          <div key={item} className='relative'>
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setMenu(item)}
              className={`cursor-pointer px-5 py-2 text-sm font-medium rounded-full relative z-10 transition-colors ${
                menu === item ? 'text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId='activeCategory'
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className='absolute inset-0 bg-gray-900 rounded-full -z-10'
                />
              )}
            </motion.button>
          </div>
        ))}
      </motion.div>

      <AnimatePresence mode='popLayout'>
        <motion.div
          key={menu}
          layout
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24'
        >
          {visibleBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default BlogList
import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  if (!blog) return null;
  const { title, description, category, image, _id } = blog;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      onClick={() => navigate(`/blog/${_id}`)}
      className='group flex flex-col w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer'
    >
      <div className='overflow-hidden aspect-[16/10]'>
        <img
          src={image}
          alt={title}
          className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out'
        />
      </div>

      <div className='p-6 flex flex-col flex-1'>
        <span className='mb-4 px-3 py-1 self-start inline-flex bg-gray-100 rounded-full text-gray-600 text-[11px] font-medium uppercase tracking-wider'>
          {category}
        </span>

        <h5 className='mb-3 text-lg font-semibold text-gray-900 line-clamp-2 leading-snug'>
          {title}
        </h5>

        <p className='text-sm text-gray-500 line-clamp-3 mb-4 flex-1' dangerouslySetInnerHTML={{"__html": description}} />

        <div className='mt-auto pt-4 border-t border-gray-50 flex items-center text-primary text-sm font-medium'>
          Read Article
          <motion.span className='ml-2' animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, repeatDelay: 1.5, duration: 0.6 }}>→</motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export default BlogCard
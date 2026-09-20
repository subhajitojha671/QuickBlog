import React from 'react'
import { motion } from 'framer-motion'

const NewsLatter = () => {
  return (
    <div className='mx-6 sm:mx-16 xl:mx-32 mb-32'>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex flex-col items-center justify-center text-center space-y-4 bg-gray-50 rounded-[2rem] py-14 sm:py-20 px-6 sm:px-12 border border-gray-100'
      >
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900'>Never Miss an Update</h1>
        <p className='text-sm sm:text-lg text-gray-500 max-w-xl pb-4 sm:pb-6'>Subscribe to our newsletter and get the latest articles, exclusive tech news, and insights delivered straight to your inbox.</p>

        <form className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0 w-full max-w-md bg-transparent sm:bg-white sm:border sm:border-gray-200 rounded-2xl sm:rounded-full sm:p-1.5 sm:shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all'>
          <input
            type='email'
            placeholder='Enter your email address'
            className='flex-1 min-w-0 w-full bg-white sm:bg-transparent border border-gray-200 sm:border-none rounded-full sm:rounded-none outline-none px-4 py-3 sm:py-0 text-sm text-gray-700 placeholder-gray-400'
            required
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type='submit'
            className='w-full sm:w-auto shrink-0 px-6 py-3 sm:py-2.5 text-sm font-medium text-white bg-gray-900 rounded-full'
          >
            Subscribe
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default NewsLatter
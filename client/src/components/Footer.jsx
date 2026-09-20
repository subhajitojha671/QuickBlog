import React from 'react'
import { motion } from 'framer-motion'
import { assets, footer_data } from '../assets/assets';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className='px-6 md:px-16 lg:px-32 bg-white border-t border-gray-100 pt-16'
    >
      <div className='flex flex-col md:flex-row items-start justify-between gap-12 pb-12 border-b border-gray-100'>
        <div className='max-w-sm'>
          <img src={assets.logo} alt="logo" className='w-28 sm:w-36 mb-6' />
          <p className='text-gray-500 text-sm leading-relaxed'>
            Empowering writers to share their voice. Built with modern web technologies to ensure a seamless reading and writing experience.
          </p>
        </div>
        <div className='flex flex-wrap gap-12 md:gap-24'>
          {footer_data.map((section, index) => (
            <div key={index}>
              <h3 className='font-bold text-gray-900 mb-4'>{section.title}</h3>
              <ul className='flex flex-col space-y-3'>
                {section.links.map((link, i) => (
                  <li key={i}><a href='#' className='text-sm text-gray-500 hover:text-gray-900 transition-colors'>{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='py-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <p className='text-sm text-gray-400'>© {new Date().getFullYear()} QuickBlog. All rights reserved.</p>
      </div>
    </motion.footer>
  )
}

export default Footer
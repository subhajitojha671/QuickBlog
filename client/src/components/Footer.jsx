import React from 'react'

// Import assets (logo, images, etc.)
import { assets } from '../assets/assets'

// Import footer data (sections like Company, Support, etc.)
import { footer_data } from '../assets/assets';

const Footer = () => {
  return (
    // Main container with padding and background color
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/5'>
      
      {/* Top section of footer */}
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
        
        {/* Left side: Logo + Description */}
        <div>
          {/* Logo image */}
          <img src={assets.logo} alt="logo" className='w-32 sm:w-44' />

          {/* Description text */}
          <p className='max-w-[410px] mt-6'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
            Rerum unde quaerat eveniet cumque accusamus atque qui error quo enim fugiat?
          </p>
        </div>

        {/* Right side: Footer links sections */}
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
          
          {/* Loop through footer_data */}
          {footer_data.map((section, index) => (
            
            // Each section (like Company, Support)
            <div key={index}>
              
              {/* Section title */}
              <h3 className='font-semibold text-base text-gray-900 md:mb-5 mb-2'>
                {section.title}
              </h3>

              {/* Links list */}
              <ul className='text-sm space-y-1'>
                
                {/* Loop through links inside each section */}
                {section.links.map((link, i) => (
                  <li key={i}>
                    
                    {/* Link item */}
                    <a href='#' className='hover:underline transition'>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>

      {/* Bottom copyright section */}
      <p className='py-4 text-center text-sm md:text-base text-gray-500/80'>
        Copyright 2026 © QuickBlog. All rights reserved.
      </p>

    </div>
  )
}

export default Footer
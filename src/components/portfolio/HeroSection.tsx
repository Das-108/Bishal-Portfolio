import React from 'react';
// import { RiArrowRightLine } from 'react-icons/ri';
import image from '../assets/pic1.jpg'
import CV from '../assets/jsCert.png'
import Image from "next/image";


const Hero = () => {


  return (
    // 1. Ensure section takes full viewport height and uses padding for vertical centering
    <section id="hero" className='min-h-screen flex items-center py-20'>
      
      {/* Container: Max width and responsive padding */}
      <div className='max-w-6xl mx-auto w-full px-6 sm:px-8 lg:px-12 
                    grid grid-cols-1 lg:grid-cols-2 
                    gap-12 lg:gap-16 items-center'>

        {/* Right Image (Moved for Mobile-First Display) 
           On small screens (col-start-1), the image is placed first.
           On large screens (lg:col-start-2), the image is moved back to the right column.
           This is a common mobile-first pattern for hero sections.
        */}
        <div className='order-1 lg:order-2 flex justify-center lg:justify-end'>
          <div 
            className='w-64 sm:w-72 md:w-80 lg:w-96 
                       h-64 sm:h-72 md:h-80 lg:h-96 
                       rounded-full overflow-hidden border-4 shadow-2xl dark:shadow-xl dark:shadow-[#4b4b7c]'
            // 2. CSS Variable Fix: Use inline style for border-color
            style={{ borderColor: 'var(--color-accent)' }} 
          >
            <Image
              className="w-full h-full object-cover"
              src={image}
              alt="Bishal Gaihre Portrait"
              priority     // optional (good for hero section)
            />
          </div>
        </div>
        
        {/* Left Content (Text) 
           On large screens, this is ordered first (left column).
           On small screens, this is ordered second (below the image).
        */}
        <div className='order-2 lg:order-1 space-y-6 sm:space-y-8 text-center lg:text-left'>
          <p className='text-lg sm:text-xl font-medium' style={{ color: 'var(--color-accent)' }}>
            Hi, I'm Bishal Gaihre 🌿
          </p>
          
          {/* Main Title */}
          <h1 
            className='text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight'
            // 3. CSS Variable Fix: Use inline style for text-color
            style={{ color: 'var(--text-default)' }} 
          >
            UI/UX Designer &amp;<br />
            <span style={{ color: 'var(--color-accent)' }}>Full Stack Developer</span>
          </h1>
          
          <p className='text-lg sm:text-xl italic text-gray-500'>
            "I build experiences rooted in clarity and purpose."
          </p>

          {/* Buttons: Stacked on small, side-by-side on medium/large */}
          <div className='flex flex-row gap-4 justify-center lg:justify-start items-center'>
            {/* Button 1: Outline */}
            <a 
              download="Bishal-Gaihre-CV.pdf"
            >
              <button
                className='px-4 sm:px-8 py-3 sm:py-4 border-2 rounded-xl transition-all duration-300 hover:bg-accent'              
                style={{ 
                  borderColor: 'var(--color-accent)', 
                  color: 'var(--color-accent)',
                }}             
                // onMouseOver={e => e.currentTarget.style.color = 'var(--bg-primary)'}
                // onMouseOut={e => e.currentTarget.style.color = 'var(--color-accent)'}
              >
                Download CV
              </button> 
            </a>
            
            {/* Button 2: Solid */}
            {/* Fixed the typo 'felx' to 'flex' and removed padding from the <a> tag to keep alignment clean */}
            <a href="mailto:bishalgaihre4@gmail.com" className='flex items-center'>
              <button
                className='px-4 sm:px-8 py-3 sm:py-4 rounded-xl flex items-center gap-2 justify-center transition-all duration-300 hover:shadow-lg'
                style={{ backgroundColor: 'var(--color-accent)', color: 'var(--bg-primary)' }}
              >
                Contact Me
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
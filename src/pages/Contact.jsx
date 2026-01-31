import React from 'react'
import BackImg from "../assets/A.jpeg"
import Navbar from '../components/Navbar'

const Contact = () => {
  return (
    <>
      <Navbar />
      
      <div
        className="relative flex flex-col items-center justify-center text-white pt-28 px-4 sm:px-6 lg:px-8"
        id="contact"
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover opacity-50 -z-10"
          style={{
            backgroundImage: `url(${BackImg})`,
          }}
        ></div>

        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-black/5 -z-10"></div>

        <div className='relative z-10 w-full max-w-7xl'>
          <h1 className='text-orange-500 text-3xl sm:text-4xl lg:text-5xl text-center font-bold mt-3'>Contact Our Team</h1>
          <div className='bg-orange-500 h-1 w-20 sm:w-24 lg:w-30 rounded-2xl mx-auto mt-2'></div>
          <p className='text-gray-200 font-sans text-base sm:text-lg lg:text-xl text-center mt-4 px-4'>
            Have questions about our premium fleet? Our team is ready to <br className="hidden sm:block" /> assist with your car rental needs.
          </p>
          
          <div className='flex flex-col lg:flex-row w-full justify-center gap-6 lg:gap-10 mt-10 pb-20'>

            {/* Information Box */}
            <div className='bg-gray-950/80 w-full lg:w-96 h-auto rounded-2xl border border-gray-900 p-6'>
              <div className='flex text-lg sm:text-xl font-medium mb-6'>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" className="mr-3 mt-1 text-orange-400 text-lg flex-shrink-0" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path>
                </svg>
                Our Information
              </div>
              
              <div className='space-y-3'>
                <div className='bg-gray-800 p-4 rounded-sm flex items-center hover:bg-gray-700/90 transition duration-300'>
                  <div className='bg-green-900 w-10 h-10 p-2 rounded-sm flex-shrink-0'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="text-green-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                    </svg>
                  </div>
                  <div className='flex flex-col ml-3 font-sans'>
                    <span className="font-medium">Whatsapp</span>
                    <span className='text-gray-500 text-sm'>+91 7879482501</span>
                  </div>
                </div>

                <div className='bg-gray-800 p-4 rounded-sm flex items-center hover:bg-gray-700/90 transition duration-300'>
                  <div className='bg-gray-900 w-10 h-10 p-2 rounded-sm flex-shrink-0'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-orange-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                    </svg>
                  </div>
                  <div className='flex flex-col ml-3 font-sans'>
                    <span className="font-medium">Email</span>
                    <span className='text-gray-500 text-sm break-all'>contact@hexagonsservices.com</span>
                  </div>
                </div>

                <div className='bg-gray-800 p-4 rounded-sm flex items-center hover:bg-gray-700/90 transition duration-300'>
                  <div className='bg-gray-900 w-10 h-10 p-2 rounded-sm flex-shrink-0'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-orange-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M256,8C119,8,8,119,8,256S119,504,256,504,504,393,504,256,393,8,256,8Zm92.49,313h0l-20,25a16,16,0,0,1-22.49,2.5h0l-67-49.72a40,40,0,0,1-15-31.23V112a16,16,0,0,1,16-16h32a16,16,0,0,1,16,16V256l58,42.5A16,16,0,0,1,348.49,321Z"></path>
                    </svg>
                  </div>
                  <div className='flex flex-col ml-3 font-sans'>
                    <span className="font-medium">Hours</span>
                    <span className='text-gray-500 text-sm'>Mon-Sat: 8AM-8PM</span>
                    <span className='text-gray-500 text-sm'>Sunday: 10AM-6PM</span>
                  </div>
                </div>

                <div className='bg-orange-400/20 border border-amber-400/20 p-4 rounded-sm flex items-center'>
                  <div className='bg-gray-900 w-10 h-10 p-2 rounded-sm flex-shrink-0'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="text-orange-400" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path>
                    </svg>
                  </div>
                  <div className='flex flex-col ml-3 font-sans'>
                    <span className="font-medium">Special Offer!</span>
                    <span className='text-gray-500 text-sm'>Book for 3+ days and get 10% discount</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Box */}
            <div className='bg-gray-950/80 w-full lg:w-[560px] rounded-2xl border border-gray-600 overflow-hidden p-6 sm:p-8 relative'>
              <div className='bg-orange-800/40 w-20 h-20 rounded-full absolute -top-10 right-0 lg:right-[-10px]'></div>
              <div className='bg-orange-800/40 w-20 h-20 rounded-full absolute bottom-0 left-[-10px]'></div>
              
              <div className='relative z-10'>
                <div className='flex text-lg sm:text-xl font-medium mb-2'>
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="mr-3 text-orange-400 mt-1 flex-shrink-0" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M435.9 64.9l-367.1 160c-6.5 3.1-6.3 12.4.3 15.3l99.3 56.1c5.9 3.3 13.2 2.6 18.3-1.8l195.8-168.8c1.3-1.1 4.4-3.2 5.6-2 1.3 1.3-.7 4.3-1.8 5.6L216.9 320.1c-4.7 5.3-5.4 13.1-1.6 19.1l64.9 104.1c3.2 6.3 12.3 6.2 15.2-.2L447.2 76c3.3-7.2-4.2-14.5-11.3-11.1z"></path>
                  </svg>
                  Send Your Inquiry
                </div>
                <p className='text-sm font-sans text-gray-400 mb-6'>Fill out the form and we'll get back to you promptly</p>
                
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4'>
                  <div className='bg-gray-800 h-10 border border-gray-700 flex rounded-sm items-center px-3'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className='fill-amber-500 flex-shrink-0' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                    </svg>
                    <input className='ml-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all w-full' type="text" placeholder='Full Name' />
                  </div>
                  
                  <div className='bg-gray-800 h-10 border border-gray-700 flex rounded-sm items-center px-3'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className='fill-amber-500 flex-shrink-0' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                    </svg>
                    <input className='ml-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all w-full' type="email" placeholder='Email Address' />
                  </div>
                  
                  <div className='bg-gray-800 h-10 border border-gray-700 flex rounded-sm items-center px-3'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className='fill-amber-500 flex-shrink-0' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path>
                    </svg>
                    <input className='ml-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all w-full' type="tel" placeholder='Phone Number' />
                  </div>
                  
                  <div className='bg-gray-800 h-10 border border-gray-700 flex rounded-sm items-center px-3'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className='fill-amber-500 flex-shrink-0' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path>
                    </svg>
                    <input className='ml-3 bg-transparent focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all w-full' type="tel" placeholder='Alternate Number' />
                  </div>
                </div>
                
                <div className='bg-gray-800 border border-gray-700 rounded-xl p-3 mb-4'>
                  <div className='flex'>
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className='mr-3 mt-1 flex-shrink-0' height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"></path>
                    </svg>
                    <textarea 
                      name="message" 
                      required 
                      rows="3" 
                      placeholder="Tell us about your rental needs..." 
                      className="w-full text-white bg-transparent focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm transition-all resize-none"
                    ></textarea>
                  </div>
                </div>
                
                <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-md w-full transition duration-300">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Contact
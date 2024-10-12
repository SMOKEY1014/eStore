import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'

const Footer = () => {
  return (
      <div>
          <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
              <div className="">
                  <img src={assets.logo} className='mb-5 w-32' alt="" />
                  <p className='w-full md:w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus doloremque asperiores delectus quia eligendi laborum ea explicabo corrupti voluptatem praesentium.
                  </p>
              </div>
              <div className="">
                  <p className='text-xl font-medium mb-5'>COMPANY</p>
                  <ul className='flex flex-col gap-1 text-gray-600'>
                      <li>Home</li>
                      <li>About us</li>
                      <li>Delivery</li>
                      <li>Privacy Policy</li>
                  </ul>
              </div>
              <div className="">
                  <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                  <ul className='flex flex-col gap-1 text-gray-600'>
                      <li>+27 76 321 1265</li>
                      <li>support@brainric.com</li>
                  </ul>
              </div>
          </div>
          <div>
              <hr />
              <p className='py-5 text-sm text-center'>Copyrights 2024@Brainric.com - All Rights Reserved.</p>
          </div>
    </div>
  )
}

export default Footer
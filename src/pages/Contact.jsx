import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>187 Mp16 Street <br /> Madadeni, Newcastle, South Africa</p>
          <p className='text-gray-500'>Tel: (+27) 78 329 1262 <br />Email: support@brainric.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Brainric</p>
          <p className='text-gray-500'>Learn more about our teams and job openings</p>
          <p className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
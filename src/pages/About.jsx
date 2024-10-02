import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className="w-full md:max-w-[450px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit magnam laborum corporis tenetur, eum quia! Nulla, eligendi molestiae voluptate expedita voluptatum in ipsum temporibus nisi nesciunt consequuntur iure? Alias, nam!</p>
          <p className="">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur eligendi illo architecto fugiat culpa ex fuga, accusamus nam non officiis qui pariatur nostrum. Eius, nisi est expedita dignissimos eum culpa.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus quaerat unde et aut voluptates esse debitis, vitae, porro incidunt inventore deserunt ex a autem repudiandae aspernatur quis facere numquam. Officia!</p>
        </div>
      </div>
      <div className="text-2xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt temporibus illum, adipisci quam nobis quia dolor officiis harum repellendus? A, soluta rem! Nemo, nisi ad exercitationem aut voluptatum quisquam nesciunt!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convinience:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt temporibus illum, adipisci quam nobis quia dolor officiis harum repellendus? A, soluta rem! Nemo, nisi ad exercitationem aut voluptatum quisquam nesciunt!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Custormer Service:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt temporibus illum, adipisci quam nobis quia dolor officiis harum repellendus? A, soluta rem! Nemo, nisi ad exercitationem aut voluptatum quisquam nesciunt!</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About
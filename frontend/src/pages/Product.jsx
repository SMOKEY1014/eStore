import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets/frontend_assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) { 
        setProductData(item);
        setImage(item.image[0])
        return null;
      }
    })
    // setProductData(await products.find(product => product.id === productId))
  }

  useEffect(() => {
    fetchProductData();
  },[productId, products])

  return productData ? (
    <div className='border-t pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} className='w-full h-auto' alt="" />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(123)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p className="">Select size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-500'>ADD TO CART</button>
          <hr className='my-8 sm:w-4/5' />
          <div className="text-sm text-gray-500 flex flex-col gap-1">
            <p>100% Cotton product.</p>
            <p>Cash on Delivery is available for this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* -----------Description and review section--------- */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm">Deescription</p>
          <p className="border px-5 py-3 text-sm">Reviews (123)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum, ipsa velit quos dicta officiis animi, esse commodi repudiandae molestias quia dolorem mollitia reprehenderit itaque! Ullam obcaecati officia iusto voluptatibus quisquam.

          </p>
          <p className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste accusantium ab delectus tempore autem accusamus voluptatibus numquam commodi error cumque ea voluptatum possimus ducimus eveniet, molestias tenetur officia quo assumenda!

          </p>
        </div>
      </div>
      {/* --------Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
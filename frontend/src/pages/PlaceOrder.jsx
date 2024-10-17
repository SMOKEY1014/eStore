import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  
  const [method, setMethod] = useState('cod');
  const { navigate, backend_Url, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [paymentUrl, setPaymentUrl] = useState('')
  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country: "",
    phone:""
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (let items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
            };
          }
      }
      
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (method) {
        //API Calls for Cash On Delivery
        case 'cod':
          const responce = await axios.post(backend_Url + '/api/order/place', orderData, { headers: { token } });
          if (responce.data.success) {
            toast.success(responce.data.message)
            setCartItems({});
            navigate('/orders')
            
          } else {
            toast.error(responce.data.message)
            console.log(responce)
          }
          break;
        
        case 'stripe':
          // console.log('Entering stripe gateway')
          const responceStripe = await axios.post(backend_Url + '/api/order/stripe', orderData, { headers: { token } });
          if (responceStripe.data.success) {
            const { session_url } = responceStripe.data
            window.location.replace(session_url)
          } else {
            console.log(responceStripe)
            toast.error(responceStripe.data.message)
          }
          break;
        
        case 'Payfast':
          console.log("Payfast...");
          toast.success("Initiating Payfast payment... Please wait...");

          try {
            const responsePayfast = await axios.post(`${backend_Url}/api/order/payfast`, orderData, { headers: { token } });

            if (responsePayfast.data.success) {
              setPaymentUrl(responsePayfast.data.paymentUrl);
              window.location.href = responsePayfast.data.paymentUrl;
            } else {
              toast.error(responsePayfast.data.message);
            }
          } catch (error) {
            console.error("Error initiating Payfast:", error);
            toast.error("Payfast initiation failed");
          }

          break;
      
        default:
          break;
      }

      } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* -------Left Side ------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='First Name'/>
          <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Last Name'/>
        </div>
          <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Email Address'/>
        <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Street' />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='City' />
          <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='State/Province' />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='ZIP Code' />
          <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Country' />
        </div>
          <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="phone" className='border border-gray-300 rounded py-1.5 px-3.5 w-full' placeholder='Phone Number'/>
      </div>

      {/* -------- Right side -------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div onClick={() => setMethod('stripe')} className="flex items-center lg:min-w-40 gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-600' : ''}`}></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div>
            {/* <div onClick={() => setMethod('razorpay')} className="flex items-center lg:min-w-40 gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-600' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" className="h-5 mx-4" />
            </div> */}
            <div onClick={() => setMethod('Payfast')} className="flex items-center lg:min-w-40 gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'Payfast' ? 'bg-green-600' : ''}`}></p>
              <img src={assets.payfast} alt="" className="h-5 mx-4" />
            </div>
            <div onClick={() => setMethod('cod')} className="flex items-center lg:min-w-40 gap-3 border p-2 px-3 cursor-pointer">
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-600' : ''}`}></p>
              <p className="text-gray-500 font-medium mx-4 text-sm">CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm rounded-md'>PLACE ORDER</button>
          </div>
        </div>
      </div>
      
    </form>
  )
}

export default PlaceOrder
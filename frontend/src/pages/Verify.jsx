import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const { navigate, token, setCartItems, backend_Url } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }

            const responce = await axios.post(backend_Url + '/api/order/verify', { success, orderId }, { headers: { token } });
            if (responce.data.success) { 
                setCartItems({});
                navigate('/orders');
                toast.success(responce.data.message)

            } else {
                toast.error(responce.data.message);
                navigate('/cart')
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

  return (
      <div>
          
    </div>
  )
}

export default Verify
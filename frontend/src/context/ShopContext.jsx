import { createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets/frontend_assets/assets";
import { toast, useToast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = 'R'
    const delivery_fee = 150;
    const backend_Url = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');


    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) { 
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backend_Url + '/api/cart/add', { itemId, size }, { headers: { token } })
                toast.success('Item added to Cart!')
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (let items in cartItems) {
            for (let item in cartItems[items]) { 
                try {
                    totalCount += cartItems[items][item];
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backend_Url + '/api/cart/update', { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (let items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            for (let item in cartItems[items]) { 
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += cartItems[items][item] * itemInfo.price;
                        
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => { 
        try {
            const responce = await axios.get(backend_Url + '/api/product/list')
            if (responce.data.success) {
                setProducts(responce.data.products)
            } else {
                toast.error(responce.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const responce = await axios.post(backend_Url + '/api/cart/get',{}, { headers: { token } });
            if (responce.data.success) {
                setCartItems(responce.data.cartData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getProductsData();
    }, [])
    
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'));
        }
    },[])

    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch,
        setShowSearch, cartItems, addToCart,
        getCartCount, updateQuantity, getCartAmount,
        navigate, backend_Url, token, setToken, setCartItems
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
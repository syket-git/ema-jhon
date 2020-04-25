import React from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import { useState } from 'react';
import ReviewItems from '../ReviewItems/ReviewItems';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Order = () => {
    const [cart, setCart] = useState([]);
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }


    const auth = useAuth();
   
    

  
    
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKey = Object.keys(savedCart);
        fetch('http://localhost:4200/getProductKey',{
            method:'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKey)
        })
        .then(res => res.json())
        .then(data => {
           
            const cartProducts = productKey.map(key => {
                const products = data.find(pd => pd.key === key )
                products.quantity = savedCart[key]
                return products
            })
            setCart(cartProducts);
        })
        
        
    }, [])
    return (
        <div className="shop-container">
            
            <div className="product-container">
                {
                    cart.map(pd =>  <ReviewItems 
                        removeProduct = {removeProduct}
                        product={pd}></ReviewItems>)
                }
                
                {
                    !cart.length && <h2 className="text-center mt-5">Your cart is empty <a href="/">keep shopping</a></h2>
                }
            </div>
            <div className="cart-container"> 
                <Cart cart={cart}>
                    <Link to="/shipment">
                        { auth.user ?  
                            <button className="button">Proceed to Shipment</button>
                            :
                            <button className="button">Login to Proceed</button>

                        }
                    </Link>
                </Cart>
            </div>
            
        </div>
    );
};

export default Order;
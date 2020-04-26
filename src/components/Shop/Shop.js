import React from 'react';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import 'bootstrap/dist/css/bootstrap.css';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';


const Shop = () => {
    
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch("https://protected-depths-05659.herokuapp.com/products")
        .then(res => res.json())
        .then(data => {
           setProducts(data)
           
        })
    }, [products])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        
        const productKeys = Object.keys(savedCart);
        
        if(products.length){
            const previousCart = productKeys.map(existingKey => {
                const product = products.find( pd => pd.key === existingKey)
                
                product.quantity = savedCart[existingKey];
                return product;
                
            })
            setCart(previousCart);
        }
        
    }, [products])

    const handleAddedProduct = (product) =>{
        const toBeAdded = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded);
            newCart = [...others, sameProduct];
        }else{
            product.quantity = 1;
            newCart = [...cart, product]
        }

        
        setCart(newCart);
        
        addToDatabaseCart(product.key, count);
        
    }

    return (
        <div style={{fontFamily:'Arial'}} className="shop-container">
            
            <div className="product-container">
                
                
                { products.length &&
                    products.map(product => <Product
                        
                       key = {product.key} 
                       handleAddedProduct = {handleAddedProduct}
                       details = {false}
                       showAddToCart = {true}
                       product={product}></Product>)
                }
                
            </div>
            <div className="cart-container">
                 <Cart cart={cart}>
                    <button className="button">Review Order</button>
                 </Cart>
            </div>
            
        </div>
    );
};

export default Shop;
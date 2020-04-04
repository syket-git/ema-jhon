import React from 'react';
import './Cart.css';
import { Link } from 'react-router-dom';

const Cart = (props) => {


    const cart = props.cart;
    const price = cart.reduce((total, product) => total + product.price * product.quantity , 0);

    let shipping = 0;
    if(price > 100){
        shipping = 5;
    }else if(price > 50){
        shipping = 8;
    }else if(price > 20){
        shipping = 10;
    }else if(price > 10){
        shipping = 12;
    }else if(price > 0){
        shipping = 14;
    }

    const tax = price * (10/100);
    const total = price + shipping + tax;

    const fixedNumber = (num) => {
        return Number(num.toFixed(2));
    }

    return (
        <div style={{fontFamily:'arial'}} className="cart">
            <h2 className="center">Order Summery</h2>
            <h3 className="center">Items Order: {cart.length}</h3>
            <p>Items Price:         ${fixedNumber(price)}</p>
            <p>Shipping & Handling: ${fixedNumber(shipping)}</p>
            <p>Total before Tax:    ${fixedNumber(price + shipping)}</p>
            <p>Estimated Tax:       ${fixedNumber(tax)}</p>
            <h3 style={{color: 'darkRed'}}>Grand Total:        ${fixedNumber(total)}</h3>
            <br/>
            <Link to="/order">
                {
                    props.children
                }

                
            </Link>
            
    </div>
    );
};

export default Cart;
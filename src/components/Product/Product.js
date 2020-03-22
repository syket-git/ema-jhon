import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';

const Product = (props) => {
    console.log(props.product);
    const { name, img, seller, price, stock } = props.product;
    return (
        <div className="product">

            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-data">
                <h4 className="name">{name}</h4>
                <p className="seller">by: {seller}</p>
                <div className="two-section">
                    <div className="price-area">
                        <p className="price">${price}</p>
                        <p><small>only {stock} left in stock - Order soon</small></p>
                        <button className="button" onClick={() => props.handleAddedProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button>
                    </div>
                    <div className="review-area">
                        this is another data
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Product;
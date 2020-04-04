import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    //console.log(props);
    const { name, img, seller, price, stock, key, wholePrice, priceFraction, category } = props.product;
    return (
        <div className="product">

            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-data">
                <h4 className="name"><Link to={"/product/"+key}>{name}</Link></h4>
                <p className="seller">by: {seller}</p>
                <div className="two-section">
                    <div className="price-area">
                        <p className="price">${price}</p>
                        
                        <p><small>only {stock} left in stock - Order soon</small></p>

                        { props.details && <p>Whole Price: ${wholePrice}</p>}
                        { props.details && <p>Price Fraction: ${priceFraction}</p>}
                        { props.details && <p>Category: {category}</p>}
 
                        { props.showAddToCart && <button className="button" onClick={() => props.handleAddedProduct(props.product)}> <FontAwesomeIcon icon={faShoppingCart} /> add to cart</button> }

                    </div>
                    
                </div>
            </div>

        </div>
    );
};

export default Product;
import React from 'react';

const ReviewItems = (props) => {
    const {name, stock, quantity, price, img, key} = props.product;
    const reviewStyle = {
        width: '90%',
        marginLeft: '50px',
        padding: '20px',
        borderBottom: '1px solid lightGray'
    }
    return (
        <div>
            <div style={reviewStyle} className="product-data">
                <img src={img} alt=""/>
                <h3 className="name">{name}</h3>
                <h4>Price: ${price}</h4>
                <h4>stock: {stock}</h4>
                <h4>Quantity: {quantity}</h4>
                <br/>
                <button onClick={() => props.removeProduct(key)} className="button">Remove Item</button>
            </div>
            <div className="cart-container">
            </div>
        </div>
    );
};

export default ReviewItems;
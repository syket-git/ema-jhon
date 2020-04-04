import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const ProductDetails = fakeData.find( pd => pd.key === productKey);

    
    return (
        <div>
            <Product details={true}  showAddToCart={false} product={ProductDetails}>
            <h5>{ProductDetails.wholePrice}</h5>
            </Product>
    
        </div>
    );
};

export default ProductDetails;
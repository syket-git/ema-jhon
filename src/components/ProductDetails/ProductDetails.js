import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';

const ProductDetails = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch("https://protected-depths-05659.herokuapp.com/product/" + productKey)
            .then(res => res.json())
            .then(data => {
                setProduct(data)
            })
    }, [productKey]);

    //const ProductDetails = fakeData.find( pd => pd.key === productKey);


    return (
        <div>
            {
                product && <Product details={true} showAddToCart={false} product={product}>
                    <h5>{product.wholePrice}</h5>
                </Product>
            }

        </div>
    );
};

export default ProductDetails;
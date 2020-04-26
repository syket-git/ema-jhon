import React from 'react';

import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();

    const [paymentError, setPaymentError] = useState(null);
    const [paymentFinished, setPaymentFinished] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });
       if(error){
           setPaymentError(error.message);
           setPaymentFinished(null);
       }else{
           setPaymentFinished(paymentMethod);
           const payment = {id:paymentMethod.id, last4:paymentMethod.card.last4}
           props.handlePlaceOrder(payment);
           setPaymentError(null);
       }
    };

    return (
        <div className="text-center">
            <form onSubmit={handleSubmit}>
                <CardElement />
                <button className="btn btn-success mt-3" type="submit" disabled={!stripe}>
                    Pay
                </button>
                {
                    paymentError && <p style={{color:'red', marginTop:'5px'}}>{paymentError}</p>
                }
                {
                    paymentFinished && <p style={{color:'green', marginTop:'5px'}}>Payment Successful!</p>
                }
            </form>
        </div>
    );
};


export default CheckoutForm;
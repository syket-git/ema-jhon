import React from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';
import { useEffect } from 'react';

const Shipment = () => {
    const { register, handleSubmit, errors, reset } = useForm()
    const [shipmentInfo, setShipmentInfo] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const auth = useAuth(); 

    const stripePromise = loadStripe('pk_test_RoZEYmMGVLAcXIQR9w2H97Rt00WWxZxRxj');

    const onSubmit = data => {
        setShipmentInfo(data);
    }


    const handlePlaceOrder = async (payment) => {
        const savedCart = getDatabaseCart();
        const orderDetails = {
        email: auth.user.email,
        cart: savedCart,
        shipment: shipmentInfo,
        payment: payment
    };
    
        
       await fetch('https://protected-depths-05659.herokuapp.com/placeOrder', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
        })
        .then( res => res.json()).catch(error => console.log("form response: ", error))
        .then(data => {
            console.log(data);
        }).catch(error => console.log("from data: ", error));
        processOrder();
        
   

            
 
        
    }

        
            

    return (
        <div>

            <div className="container">
                <div className="row">
                    <div style={{display: shipmentInfo && 'none'}} className="col-md-6">
                        <div className="form">
                            <h2 className="text-center mt-3">Give me your information</h2>

                            <p className="text-center font-weight-bold mb-3 text-success">so that we can sent your product correctly</p>

                            <form onSubmit={handleSubmit(onSubmit)}>

                                <input defaultValue={auth.user.name} className="form-control" name="name" placeholder="Enter your name" ref={register({ required: true })} />
                                {errors.name && <span className="text-danger font-italic font-weight-bold">Name is required</span>}

                                <br />

                                <input defaultValue={auth.user.email} type="email" className="form-control" name="email" placeholder="Enter your email" ref={register({ required: true })} />
                                {errors.email && <span className="text-danger font-italic font-weight-bold">Email is required</span>}

                                <br />

                                <input className="form-control" name="address1" placeholder="Enter your Address 1" ref={register({ required: true })} />
                                {errors.address1 && <span className="text-danger font-italic font-weight-bold">Address 1 is required</span>}

                                <br />

                                <input className="form-control" ref={register({ required: false })} placeholder="Enter your Address 2" name="address2" />

                                <br />

                                <input className="form-control" name="city" placeholder="Enter your City" ref={register({ required: true })} />
                                {errors.city && <span className="text-danger font-italic font-weight-bold">City is required</span>}

                                <br />

                                <input defaultValue="Bangladesh" className="form-control" name="country" placeholder="Enter your Country" ref={register({ required: true })} />
                                {errors.country && <span className="text-danger font-italic font-weight-bold">Country is required</span>}

                                <br />

                                <input className="form-control" name="zipCode" placeholder="Enter your Zip code" ref={register({ required: true })} />
                                {errors.zipCode && <span className="text-danger font-italic font-weight-bold">Zip code is required</span>}

                                <br />

                                <div className="text-center">
                                    <input className="btn btn-success" type="submit" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div style={{display: shipmentInfo ? 'block' : 'none'}} className="col-md-6">
                       <div>
                        <h3 class="mt-3 text-center mb-5">Payment Information</h3>
                        <Elements stripe={stripePromise}>
                            <CheckoutForm handlePlaceOrder={handlePlaceOrder} ></CheckoutForm>
                        </Elements>
                        <br/>
                        {
                            orderId && <div>
                                <h3>Thank you for shopping with us</h3>
                                <p>Your order id : <span>{orderId}</span></p>
                            </div>
                        }
                       </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Shipment;
import React from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form';
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, errors, reset } = useForm()
    const auth = useAuth();
    const onSubmit = data => {
        //TODO: Syket Bhattachergee move after payment
           
            
            const savedCart = getDatabaseCart();
            const orderDetails = {email:auth.user.email, cart:savedCart}
            fetch('http://localhost:4200/placeOrder',{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderDetails)
            })
            .then(res => res.json())
            alert("Successfully Order Placed");
            processOrder();
            reset();
            window.location.replace("/");
         }
    
    return (
        <div>

        <div className="form">
            <h2 className="text-center mt-3">Give me your information</h2>

            <p className="text-center font-weight-bold mb-3 text-success">so that we can sent your product correctly</p>

            <form onSubmit={handleSubmit(onSubmit)}>

                <input defaultValue={auth.user.name} className="form-control" name="name" placeholder="Enter your name" ref={register({ required: true })} />
                {errors.name && <span className="text-danger font-italic font-weight-bold">Name is required</span>}

                <br/>

                <input defaultValue={auth.user.email} type="email" className="form-control" name="email" placeholder="Enter your email" ref={register({ required: true })} />
                {errors.email && <span className="text-danger font-italic font-weight-bold">Email is required</span>}

                <br/>

                <input className="form-control" name="address1" placeholder="Enter your Address 1" ref={register({ required: true })} />
                {errors.address1 && <span className="text-danger font-italic font-weight-bold">Address 1 is required</span>}

                <br/>

                <input className="form-control" ref={register({ required: false })} placeholder="Enter your Address 2" name="address2"  />
            
                <br/>

                <input className="form-control" name="city" placeholder="Enter your City" ref={register({ required: true })} />
                {errors.city && <span className="text-danger font-italic font-weight-bold">City is required</span>}

                <br/>

                <input defaultValue="Bangladesh" className="form-control" name="country" placeholder="Enter your Country" ref={register({ required: true })} />
                {errors.country && <span className="text-danger font-italic font-weight-bold">Country is required</span>}

                <br/>

                <input className="form-control" name="zipCode" placeholder="Enter your Zip code" ref={register({ required: true })} />
                {errors.zipCode && <span className="text-danger font-italic font-weight-bold">Zip code is required</span>}

                <br/>

               <div className="text-center">
               <input className="btn btn-success" type="submit" value="Submit"/>
               </div>
            </form>
        </div>

        </div>
    );
};

export default Shipment;
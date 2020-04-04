import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { useAuth } from '../Login/useAuth';


const Header = () => {
    const auth = useAuth();

    return (
        <div className="header">
            <a href="/"><img src={logo} alt=""/></a>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/order">Order Review</a>
                <a href="/inventory">Menage Inventory</a>
                { auth.user && <span style={{fontSize:'18px'}} className="text-warning">  Welcome, {auth.user.name} <img style={{width:'40px', height:'40px', borderRadius:'50%', marginLeft:'10px'}} src={auth.user.photo} alt=""/> </span> }

                {
                    auth.user ? <a href="/login">Sign out</a>
                    : <a href="/login">Sign in</a>
                }
            </nav>
            
        </div>
        
    );
};

export default Header;
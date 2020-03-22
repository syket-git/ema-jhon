import React from 'react';
import logo from '../../images/logo.png';
import root from '../../App.js';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <a href={root}><img src={logo} alt=""/></a>
            
            <nav>
                <a href="/shop">Shop</a>
                <a href="/order">Order Review</a>
                <a href="/menage">Menage Inventory</a>
            </nav>
            
        </div>
        
    );
};

export default Header;
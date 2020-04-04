import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Order from './components/Order/Order';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Login from './components/Login/Login';
import { AuthContextProvider, PrivateRoute } from '../src/components/Login/useAuth';
import { createContext } from 'react';
import Shipment from './components/Shipment/Shipment';


export const UserContext = createContext();


function App() {
  return (
    <div>
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Switch>
            <Route path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/order">
              <Order></Order>
            </Route>
            <Route path="/inventory">
              <Inventory></Inventory>
            </Route>

            <Route path="/login">
              <Login></Login>
            </Route>

            <Route exact path="/">
              <Shop></Shop>
            </Route>

            <Route path="/product/:productKey">
              <ProductDetails></ProductDetails>
            </Route>

            <PrivateRoute path="/shipment">
              <Shipment></Shipment>
            </PrivateRoute>

            <Route path="*">
              <NotFound></NotFound>
            </Route>

          </Switch>
        </Router>
        
      </AuthContextProvider>

    </div>
  );
}

export default App;

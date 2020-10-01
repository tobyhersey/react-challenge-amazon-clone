import React, { useEffect} from "react";
// import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Product from "./Product";
import Checkout from "./Checkout"
import { BrowserRouter as Router , Switch , Route} from "react-router-dom";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";



function App() {
  const [{ basket } , dispatch] = useStateValue();
  useEffect(() => {
    //One run once when app comp loads
    auth.onAuthStateChanged(authUser => {
      console.log('The user is >>>', authUser);
      
      if (authUser) {
        //user just logged in 
        dispatch({
          type: 'SET_USER', //send login to datalayer
          user: authUser
        })
      }
      else {
        //user is not logged in
        dispatch({
          type: 'SET_USER', //set user to not logged in
          user: null
        })
      }
    })
  }, [])

  return (
    // BEM
    <Router>
      <div className="app">
        <Switch>
        <Route path="/payment">
          <Payment />
            {/* <h1>Payment</h1> */}
          </Route>
        <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
          <Header/>
            <Checkout />
          </Route>
          <Route path="/">
            <Header/>
            <Home />
            <Product />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

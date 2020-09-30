import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Product from "./Product";
import { BrowserRouter as Router , Switch , Route} from "react-router-dom";


function App() {
  return (
    // BEM
    <Router>
      <div className="app">
        <Header />
        <Home />
        <Product />
      </div>
    </Router>
  );
}

export default App;

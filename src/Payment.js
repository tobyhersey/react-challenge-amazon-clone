import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Axios from './axios';
import React, { useEffect } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';
import { useHistory } from "react-router-dom";

function Payment() {
  const [{ basket, user } , dispatch] = useStateValue();

  const stripe = useStripe(); //pull stripe package
  const elements = useElements(); // pull stripe package
  //STRIPE ERROR HANDLING AND DISABLE STATE
  const [error , setError] = useStateValue(null);
  const [disabled , setDisabled] = useStateValue(null);
  const history = useHistory();
  //stripe secret
  const [clientSecret, setClientSecret] = useStateValue(true);

  useEffect(() => {
    //run once per user load , get new secret per basket (including any updates)
    const getClientSecret = async () => {
      const response = await Axios ({
        method: 'post',
        // stripe expects the total in current subunits
        url: `/payment/create?total=${getBasketTotal(basket) * 100 }`
      });
      setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
  } , {basket})

  //handle payment button 
  const [succeeded , setSucceeded] = useStateValue(false); //disabaled by default 
  const [processing , setProcessing] = useStateValue("");

  const handleSubmit = async (event) => {
    event.preventDefult();
    setProcessing(true) //allow buy once by detting button state

    const payload = await stripe.confirmCardPayment(clientSecret , {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    }).then(({ paymentIntent }) => {
      setSucceeded(true);
      setError(null);
      setProcessing(false);
      history.replace('/orders');
    })  //payment conf from stripe promise


  }  // handle submit on payment form // e = event
  const handleChange = event => {


    //Listen for card changes in the cardElement
    //display any errors from customer regdring card
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");


  }


  return (
    <div className='payment'>
      <div className='payment__container'>
        <h1>
            Checkout (
                <Link to="/checkout">{basket?.length} items</Link>
                )
        </h1>


        {/* Payment section - delivery address */}
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Delivery Address</h3>
            </div>
            <div className='payment__address'>
                <p>{user?.email}</p>
                <p>666 Hell Road</p>
                <p>Eternal Place of fire</p>
            </div>
        </div>

        {/* Payment section - Review Items */}
        <div className='payment__section'>
            <div className='payment__title'>
                <h3>Review items and delivery</h3>
            </div>
            <div className='payment__items'>
                {basket.map(item => (
                    <CheckoutProduct
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        price={item.price}
                        rating={item.rating}
                    />
                ))}
            </div>
        </div>


        {/* Payment section - Payment method */}
        <div className='payment__section'>
            <div className="payment__title">
                <h3>Payment Method</h3>
            </div>
            <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className='payment__priceContainer'>
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                    <h3>Order Total: {value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)} // BASKET SELECT FROM DATALAYER
                  displayType={"text"}
                  thousandSeperator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now" }</span>
                </button>
              </div>

                  {error && <div>{error}</div>}
            </form>
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default Payment

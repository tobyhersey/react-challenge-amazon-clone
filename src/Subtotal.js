import React from "react";
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from "./StateProvider";
import { getBasketTotal } from "./reducer";
import { useHistory } from "react-router-dom";

function Subtotal() {
  const history = useHistory(); // browser history
  const [{ basket } , dispatch] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* homework */}
        Subtotal ({basket.length} items): <strong>{value}</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order container a gift"
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)} //homework
        displayType={"text"}
        thousandSeperator={true}
        prefix={"$"}
      />
      <button onClick={e => history.push('/payment')}> Proceed to checkout</button>  
    </div>
  );
}

export default Subtotal

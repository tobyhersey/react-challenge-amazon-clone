import React from "react";
import './Subtotal.css'
import CurrencyFormat from 'react-currency-format';

function Subtotal() {
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              {/* homework */}
        Subtotal (0 items): <strong>0</strong>
            </p>
            <small className="subtotal_gift">
              <input type="checkbox" /> This order container a gift"
            </small>
          </>
        )}
        decimalScale={2}
        value={0} //homework
        displayType={"text"}
        thousandSeperator={true}
        prefix={"$"}
      />
      <button> Proceed to checkout</button>  
    </div>
  );
}

export default Subtotal

import React from 'react';
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';

const Subtotal = ({ totalItems, totalPrice }) => {
  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p className='subtotal__info'>
              Subtotal ({totalItems} items):{' '}
              <span className='subtotal__price'>{value}</span>
            </p>
            <div className='subtotal__gift'>
              <input className='subtotal__gift-checkbox' type='checkbox' />
              <p>This order contains a gift</p>
            </div>
          </>
        )}
        decimalScale={2}
        value={totalPrice}
        displayType='text'
        tousandsSeparator={true}
        prefix='$'
      />
      <Link to='/checkout'>
        <button className='subtotal__button'>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Subtotal;

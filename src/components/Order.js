import React from 'react';
import './Order.css';
import moment from 'moment';
import CartItem from './CartItem';
import CurrencyFormat from 'react-currency-format';

const Order = ({ order: { id, createdAt, cart, amount } }) => {
  return (
    <div className='order'>
      <h2 className='order__title'>Order</h2>
      <div className='order__details'>
        <p>{moment(createdAt).format('MMMM Do YYYY, h:mma')}</p>
        <p className='order__id'>{id}</p>
      </div>
      {cart.map((id) => (
        <CartItem key={id} id={id} hideButton={true} />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className='order__total'>OrderTotal: {value}</h3>
        )}
        value={amount / 100}
        decimalScale={2}
        displayType='text'
        thousendsSeparator={true}
        prefix='$'
      />
    </div>
  );
};

export default Order;

import React, { useCallback } from 'react';
import './Cart.css';
import { useAppState } from '../AppProvider';
import SubTotal from './Subtotal';
import CartItem from './CartItem';

const Cart = () => {
  const [{ user, cart, products }, dispatch] = useAppState();

  const getTotalPrice = useCallback(() => {
    return products.reduce((acc, current) => {
      return cart.includes(current.id) ? acc + current.price : acc;
    }, 0);
  }, [cart, products]);
  return (
    <div className='cart'>
      <div className='cart__container'>
        <div className='cart__main'>
          <img
            className='cart__ad'
            src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB42349266B_.jpg'
            alt='ad'
          />
          <div className='cart__list'>
            <h2>Hello, {user?.email || 'Guest'}</h2>
            <h2 className='cart__list-title'>Your Shopping Cart</h2>
            {cart.map((item) => (
              <CartItem key={item} id={item} />
            ))}
          </div>
        </div>
        <SubTotal totalItems={cart.length} totalPrice={getTotalPrice()} />
      </div>
    </div>
  );
};

export default Cart;

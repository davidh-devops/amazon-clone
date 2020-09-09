import React, { useCallback } from 'react';
import './CartItem.css';
import { useAppState } from '../AppProvider';
import { actions, createAction } from '../reducer';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

const CartItem = ({ id }) => {
  const [{ products }, dispatch] = useAppState();
  const removeFromCart = useCallback(
    (id) => dispatch(createAction(actions.REMOVE_FROM_CART, { id })),
    [dispatch]
  );
  const { title, price, rating, image } = products.filter(
    (product) => product.id === id
  )[0];

  return (
    <div className='cart-item'>
      <img className='cart-item__image' src={image} alt='product' />
      <div className='cart-item__container'>
        <div className='cart-item__info'>
          <h2 className='cart-item__title'>{title}</h2>
          <p className='cart-item__price'>{price}</p>
          <p className='cart-item__rating'>{`⭐️`.repeat(rating)}</p>
        </div>
        <button
          className='cart-item__button'
          onClick={() => removeFromCart(id)}
        >
          <span>Remove from Cart</span>
          <RemoveShoppingCartIcon />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

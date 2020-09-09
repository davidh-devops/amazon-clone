import React, { useCallback } from 'react';
import './Product.css';
import { useAppState } from '../AppProvider';
import { actions, createAction } from '../reducer';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';
import CurrencyFormat from 'react-currency-format';

const Product = ({ id, title, price, rating, image }) => {
  const [{ cart }, dispatch] = useAppState();
  const addToCart = useCallback(
    (id) => {
      dispatch(createAction(actions.ADD_TO_CART, { id }));
    },
    [dispatch]
  );
  const removeFromCart = useCallback(
    (id) => dispatch(createAction(actions.REMOVE_FROM_CART, { id })),
    [dispatch]
  );

  return (
    <div className='product'>
      <div className='product__info'>
        <h2 className='product__title'>{title}</h2>

        <CurrencyFormat
          renderText={(value) => <p className='product__price'>{value}</p>}
          decimalScale={2}
          value={price}
          displayType='text'
          tousandsSeparator={true}
          prefix='$'
        />

        <p className='product__rating'>{`⭐️`.repeat(rating)}</p>
      </div>
      <p className='product__rating'></p>
      <img className='product__image' src={image} alt='product' />
      {!cart.includes(id) ? (
        <button className='product__button' onClick={() => addToCart(id)}>
          <span>Add to Cart</span>
          <AddShoppingCartIcon />
        </button>
      ) : (
        <button className='product__button' onClick={() => removeFromCart(id)}>
          <span>Remove from Cart</span>
          <RemoveShoppingCartIcon />
        </button>
      )}
    </div>
  );
};

export default Product;

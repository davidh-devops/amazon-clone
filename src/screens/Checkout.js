import React, { useCallback, useEffect, useState } from 'react';
import './Checkout.css';
import { useAppState } from '../AppProvider';
import CartItem from '../components/CartItem';
import { Link, useHistory } from 'react-router-dom';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import axios from '../axios';
import { actions, createAction } from '../reducer';

const Checkout = () => {
  const [{ user, cart, products }, dispatch] = useAppState();
  const history = useHistory();

  const stripe = useStripe();
  const elements = useElements();

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(false);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios.post(
        `/payments/create?total=${getTotalPrice() * 100}`
      );
      setClientSecret(response.data.clientSecret);
    };
    if (cart.length) getClientSecret();
  }, [cart]);

  const getTotalPrice = useCallback(() => {
    return products.reduce((acc, current) => {
      return cart.includes(current.id) ? acc + current.price : acc;
    }, 0);
  }, [cart, products]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setProcessing(true);
    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      })
      .then(({ paymentIntent }) => {
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch(createAction(actions.ADD_ORDER, { order: paymentIntent }));
        history.replace('/orders');
      });
  });
  const handleChange = useCallback((event) => {
    setDisabled(event.empty);
    setError(event?.error?.message || '');
  });

  return (
    <div className='checkout'>
      <div className='checkout__container'>
        <h1>
          Checkout (
          <Link to='/cart' style={{ color: 'inherit' }}>
            {cart?.length} items
          </Link>
          )
        </h1>
        <section className='checkout__section'>
          <div className='checkout__title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='checkout__address'>
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angekes, CA</p>
          </div>
        </section>
        <section className='checkout__section'>
          <div className='checkout__title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='checkout__items'>
            {cart.length ? (
              cart.map((item) => <CartItem key={item} id={item} />)
            ) : (
              <h3>
                Your cart is empty, go back{' '}
                <Link to='/' style={{ color: 'inherit' }}>
                  Home
                </Link>
              </h3>
            )}
          </div>
        </section>
        <section className='checkout__section'>
          <div className='checkout__title'>
            <h3>Payment Method</h3>
          </div>
          <div className='checkout__details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='checkout__price-conainer'>
                <CurrencyFormat
                  renderText={(value) => <h3>OrderTotal: {value}</h3>}
                  decimalScale={2}
                  value={getTotalPrice()}
                  displayType='text'
                  tousandsSeparator={true}
                  prefix='$'
                />
              </div>
              <button
                disabled={processing || disabled || succeeded || !clientSecret}
              >
                <span>{processing ? 'Processing' : 'Buy Now'}</span>
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;

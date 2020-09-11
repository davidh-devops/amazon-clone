import React from 'react';
import { useAppState } from '../AppProvider';
import Order from '../components/Order';
import './Orders.css';

const Orders = () => {
  const [{ orders }, dispatch] = useAppState();

  return (
    <div className='orders'>
      <div className='orders__title'>
        <div className='orders__container'>
          <h1>Your Orders</h1>
        </div>
      </div>
      <div className='orders__container'>
        {orders.length ? (
          orders.map((order) => <Order key={order.id} order={order} />)
        ) : (
          <h2>You don't have any order yet</h2>
        )}
      </div>
    </div>
  );
};

export default Orders;

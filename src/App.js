import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { useAppState } from './AppProvider';
import { createAction, actions } from './reducer';
import { auth } from './firebase';
import Header from './components/Header';
import Login from './screens/Login';
import Home from './screens/Home';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';
import Orders from './screens/Orders';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { db, collections } from './firebase';

const stripeApiKey =
  'pk_test_51HPxnuBW47SN0WxevboOCIxXj73GqOA1bnJOVA03a2bhewdfwfIljaLIwV49rLjIi5ZSM63nZGs3XtzGas69qMNZ00CI5xYDx2';
const promise = loadStripe(stripeApiKey);

function App() {
  const [{ user }, dispatch] = useAppState();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(createAction(actions.SIGN_IN, { user: authUser }));
      } else {
        dispatch(createAction(actions.LOG_OUT));
      }
    });

    db.collection(collections.products).onSnapshot((snapshot) => {
      dispatch(
        createAction(actions.SET_PRODUCTS, {
          products: snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        })
      );
    });
  }, []);
  useEffect(() => {
    if (user) {
      db.collection(collections.users)
        .doc(user?.uid)
        .collection(collections.orders)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
          dispatch(
            createAction(actions.SET_ORDERS, {
              orders: snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })),
            })
          );
        });
      db.collection(collections.users)
        .doc(user?.uid)
        .onSnapshot((snapshot) => {
          dispatch(
            createAction(actions.SET_CART, {
              cart: snapshot.data().cart || [],
            })
          );
        });
    }
  }, [user]);

  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/cart'>
            <Header />
            <Cart />
          </Route>
          <Route path='/checkout'>
            <Header />
            <Elements stripe={promise}>
              <Checkout />
            </Elements>
          </Route>
          <Route path='/orders'>
            <Header />
            <Orders />
          </Route>
          <Route path='/'>
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

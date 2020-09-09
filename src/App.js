import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { useAppState } from './AppProvider';
import { createAction, actions } from './reducer';
import { auth } from './firebase';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Cart from './components/Cart';

function App() {
  const [{}, dispatch] = useAppState();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(createAction(actions.SIGN_IN, { user: authUser }));
      } else {
        dispatch(createAction(actions.LOG_OUT));
      }
    });
  }, []);

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
          <Route path='/'>
            <Header />
            <Home />
          </Route>
          <Route path='/checkout'>
            <Header />
            {/* <Checkout /> */}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

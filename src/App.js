import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import AppProvider from './AppProvider';
import reducer, { initialState } from './reducer';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';

function App() {
  return (
    <AppProvider reducer={reducer} initialState={initialState}>
      <Router>
        <div className='app'>
          <Header />
          <Switch>
            <Route path='/cart'>
              <Cart />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
            <Route path='/checkout'>{/* <Checkout /> */}</Route>
          </Switch>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

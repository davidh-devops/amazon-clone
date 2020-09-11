import React, { useCallback } from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link, useHistory } from 'react-router-dom';
import { useAppState } from '../AppProvider';
import { createAction, actions } from '../reducer';

const Header = () => {
  const [{ user, cart }, dispatch] = useAppState();
  const history = useHistory();
  const handleAuth = useCallback(() => {
    if (user) {
      dispatch(createAction(actions.SIGH_OUT));
      history.push('/');
    }
  }, [dispatch, user]);

  return (
    <div className='header'>
      <div className='header__container'>
        <Link to='/'>
          <img
            className='header__logo'
            src='https://pngimg.com/uploads/amazon/amazon_PNG11.png'
            alt='amazon logo'
          />
        </Link>
        <div className='header__search'>
          <input type='text' className='header__search-input' />
          <SearchIcon className='header__search-icon' />
        </div>
        <div className='header__nav'>
          <Link
            to='/login'
            className='header__option--first'
            style={{ textDecoration: 'none', color: 'white' }}
          >
            <div className='header__option' onClick={handleAuth}>
              <span className='header__option-line-one'>
                Hello {user ? user.email : 'Guest'}
              </span>
              <span className='header__option-line-two'>
                Sign {user ? 'Out' : 'In'}
              </span>
            </div>
          </Link>
          <Link
            to='/orders'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className='header__option'>
              <span className='header__option-line-one'>Returns</span>
              <span className='header__option-line-two'>& Orders</span>
            </div>
          </Link>
          <Link
            to='/prime'
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className='header__option'>
              <span className='header__option-line-one'>Your</span>
              <span className='header__option-line-two'>Prime</span>
            </div>
          </Link>
        </div>
        <Link to='/cart'>
          <div className='header__option-cart'>
            <ShoppingCartIcon />
            <span className='header__option-line-two header__cart-count'>
              {cart.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;

import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useAppState } from '../AppProvider';

const Header = () => {
  const [{ cart }, dispatch] = useAppState();

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
          <div className='header__option'>
            <span className='header__option-line-one'>Hello Guest</span>
            <span className='header__option-line-two'>Sign In</span>
          </div>
          <div className='header__option'>
            <span className='header__option-line-one'>Returns</span>
            <span className='header__option-line-two'>& Orders</span>
          </div>
          <div className='header__option'>
            <span className='header__option-line-one'>Your</span>
            <span className='header__option-line-two'>Prime</span>
          </div>
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

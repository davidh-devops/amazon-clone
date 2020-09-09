import React from 'react';
import './Home.css';
import { useAppState } from '../AppProvider';
import Product from './Product';

const Home = () => {
  const [{ products }, dispatch] = useAppState();

  return (
    <div className='home'>
      <div className='home__hero'>
        <img
          className='home__hero-image'
          src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
          alt='amazon hero'
        />
      </div>
      <div className='home__container'>
        {products.length ? (
          products.map(({ id, title, price, rating, image }) => (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              rating={rating}
              image={image}
            />
          ))
        ) : (
          <h2>No Products Available</h2>
        )}
      </div>
    </div>
  );
};

export default Home;

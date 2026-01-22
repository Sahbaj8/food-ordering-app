import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='header'>
      <div className='header-overlay'></div>
      <div className='header-contents'>
        <h1>Welcome to FlavorFleet</h1>
        <h2>Delicious Meals Delivered to Your Doorstep</h2>
        <p>Experience a world of flavors with our chef-crafted dishes made from the freshest ingredients. Whether you're craving comfort food or something new, we've got you covered.</p>
        <button>Explore Our Menu</button>
      </div>
    </div>
  );
};

export default Header;

import React from 'react';
import herobg from '@public/HeroBackground.png';

const Hero = () => {
  const divStyle = {
    backgroundImage: `url(/HeroBackground.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  };

  return (
    <div style={divStyle}>
      <div className='px-10 text-left'>
      </div>
    </div>
  );
};

export default Hero;

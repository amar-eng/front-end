'use client';

import Hero from '@/components/hero';
import HowItWorks from '@/components/how-it-works';

import Navbar from '@/components/navbar';
import Shared from '@/components/shared';

const Home = () => {
  return (
    <>
      <Shared>
        <Navbar />
        <Hero />
      </Shared>
      <HowItWorks />
    </>
  );
};

export default Home;

'use client';
import Hero from '@/components/hero';

import Navbar from '@/components/navbar';
import Shared from '@/components/shared';

const Home = async () => {
  return (
    <>
      <Shared>
        <Navbar />
        <Hero />
      </Shared>
    </>
  );
};

export default Home;

import Hero from '@/components/hero';
import Navbar from '@/components/navbar';
import Shared from '@/components/shared';

export default function Home() {
  return (
    <>
      <Shared>
        <Navbar />
        <Hero />
      </Shared>
    </>
  );
}

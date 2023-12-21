'use client';
import getCategories from '@/actions/get-categories';
import BookBtn from './bookBtn';
import { Button } from './ui/button';
import getServices from '@/actions/get-services';

const Hero = async () => {
  const categories = await getCategories();

  const wantedCategory = categories.find(
    (category) => category.name === 'Home'
  );
  const services = await getServices({
    categoryId: wantedCategory?.id,
  });
  return (
    <>
      <div className=" h-[70vh] lg:h-[75vh] relative z-10 px-4  text-white  flex flex-col justify-center items-center">
        <h1 className="font-semibold text-5xl">Cleaning done right.</h1>
        <p className="font-extralight text-2xl my-5">
          Connect with vetted professional cleaners for your space. No
          contracts, no risk, and affordable prices.
        </p>
        {services && services.map((cat) => <p>{cat.name}</p>)}
        <div className="flex justify-between items-start  w-100">
          <BookBtn />
          <Button className="mx-5 w-50 py-6" size="lg" variant="ghost">
            Talk To Us
          </Button>
        </div>
      </div>
    </>
  );
};

export default Hero;

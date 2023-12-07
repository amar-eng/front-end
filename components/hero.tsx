import { Button } from './ui/button';

const Hero = () => {
  return (
    <>
      <div className="border border-red-500 h-[70vh] lg:h-[75vh] relative z-10 px-4  text-white  flex flex-col justify-center items-center">
        <h1 className="font-semibold text-5xl">Cleaning done right.</h1>
        <p className="font-extralight text-2xl my-5">
          Connect with vetted professional cleaners for your space. No
          contracts, no risk, and affordable prices.
        </p>
        <div className="flex justify-between items-start border border-red-400 w-100">
          <Button className="mx-5">Book Now</Button>
          <Button className="mx-5" variant="ghost">
            Request Demo
          </Button>
        </div>
      </div>
    </>
  );
};

export default Hero;

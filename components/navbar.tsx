import Image from 'next/image';
import logo from '../public/instaclean3.svg';
import { Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="bg-transparent relative z-10 flex items-center justify-between  mx-4 pt-4">
      <Image className=" text-white" src={logo} alt="This is the logo" />
      <div className="relative z-10 border rounded-full p-1">
        <Menu color="white" strokeWidth={1} size={36} />
      </div>
    </div>
  );
};

export default Navbar;

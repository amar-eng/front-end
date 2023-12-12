import Image from 'next/image';
import logo from '../public/instaclean3.svg';
import { HomeIcon, Menu, Newspaper, Users2 } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

import { Button } from './ui/button';
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="bg-transparent relative z-10 flex items-center justify-between  mx-4 pt-4">
      <Image className=" text-white" src={logo} alt="This is the logo" />

      <Sheet>
        <SheetTrigger asChild>
          <div className="relative z-10 border rounded-full p-1 cursor-pointer">
            <Menu color="white" strokeWidth={1} size={36} />
          </div>
        </SheetTrigger>
        <SheetContent className="flex flex-col ">
          <div className="grid gap-7 py-4">
            <div className="flex items-center gap-3">
              <HomeIcon strokeWidth={1} color="#54AFBC" />
              <Link href="/">Home</Link>
            </div>
            <div className="flex items-center gap-3">
              <Users2 strokeWidth={1} color="#54AFBC" />
              <Link href="/">About Us</Link>
            </div>
            <div className="flex items-center gap-3">
              <Newspaper strokeWidth={1} color="#54AFBC" />
              <Link href="/">Blog</Link>
            </div>
          </div>

          <Button type="submit">Become a cleaner</Button>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;

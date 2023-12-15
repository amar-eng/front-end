import Image from 'next/image';
import logo from '../public/instaclean3.svg';
import logo2 from '../public/instaclean.svg';
import { HomeIcon, Menu, Newspaper, Users2 } from 'lucide-react';
import { Sheet, SheetContent, SheetFooter, SheetTrigger } from './ui/sheet';

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
        <SheetContent className="flex flex-col justify-between  ">
          <div className="flex flex-col ">
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

            <Button type="submit" className="mt-9">
              Join Our Team
            </Button>
          </div>

          <SheetFooter>
            <Image className=" text-white" src={logo2} alt="This is the logo" />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Navbar;

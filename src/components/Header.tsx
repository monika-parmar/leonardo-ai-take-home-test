"use client";

import Link from "next/link";
import UserMenu from "./UserMenu";

const Header: React.FC = () => {
  return (
    <div className='fixed top-0 left-0 w-full bg-gray-900 text-white px-4 py-2 md:py-5 shadow-sm z-10'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-4 md:gap-24'>
          {/* Company Logo and Name */}
          <a
            href='/'
            className='flex items-center gap-2 text-white'
          >
            <img
              src='/assets/company_logo.png'
              alt='Leonardo.ai'
              className='h-9 w-auto md:h-12 object-contain cursor-pointer hover:opacity-80'
            />
            <span className='hidden md:inline text-lg font-medium'>
              Leonardo.Ai
            </span>
          </a>

          {/* Navigation Menu */}
          <div className='flex gap-6'>
            <Link
              href='/dashboard/information'
              className='text-xs md:text-base font-medium hover:text-gray-300'
            >
              Information
            </Link>
          </div>
        </div>

        {/* User Menu */}
        <div className='flex items-center'>
          <UserMenu />
        </div>
      </div>

      <div className='absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#fa5560] via-[#b14bf4] to-[#4d91ff]'></div>
    </div>
  );
};

export default Header;

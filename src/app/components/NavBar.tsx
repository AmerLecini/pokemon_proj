'use client';

import Link from 'next/link';
import React from 'react';

import SearchBar from '@/app/components/SearchBar';

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0'>
            <Link href='/'>
              <div className='flex items-center space-x-2 group cursor-pointer'>
                <div className='w-8 h-8 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200'>
                  <span className='text-white font-bold text-sm'>P</span>
                </div>
                <span className='text-white font-bold text-xl group-hover:text-yellow-300 transition-colors duration-200'>
                  PokéDex
                </span>
              </div>
            </Link>
          </div>

          <div className='flex-1 max-w-lg mx-8'>
            <SearchBar />
          </div>

          <div className='flex items-center space-x-8'>
            <Link href='/team'>
              <span className='text-white  hover:text-yellow-300 font-bold text-xl transition-colors duration-200 relative group'>
                My Team
                <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full'></span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

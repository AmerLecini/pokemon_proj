'use client';

import React from 'react';

import { usePokemonContext } from '@/context/PokemonContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = usePokemonContext();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <input
      type='text'
      placeholder='Search...'
      value={searchQuery}
      onChange={handleSearch}
      className='w-full rounded-lg border-2 border-blue-500 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500'
    />
  );
};

export default SearchBar;

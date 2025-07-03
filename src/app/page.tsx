'use client';
import Link from 'next/link';
import React from 'react';

import Navbar from '@/app/components/NavBar';
import { PokemonCard } from '@/app/components/PokemonCard';

import { usePokemonContext } from '../context/PokemonContext';

const HomePage = () => {
  const { filteredPokemon } = usePokemonContext();

  return (
    <div className='min-h-screen bg-gradient-to-br from-violet-400 to-orange-500 p-6 text-gray-800'>
      <Navbar />
      <section className='mt-10'>
        <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {filteredPokemon.map((pokemon) => (
            <Link key={pokemon.name} href={`/pokemon/${pokemon.name}`}>
              <div className='transform rounded-xl bg-white p-4 shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl'>
                <PokemonCard pokemon={pokemon} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

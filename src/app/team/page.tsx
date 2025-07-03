'use client';

import { PokemonCard } from '@/app/components/PokemonCard';
import { usePokemonContext } from '@/context/PokemonContext';

export default function MyTeamPage() {
  const { team } = usePokemonContext();

  if (team.length === 0) {
    return (
      <div className='min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-8'>
        <a
          href='/'
          className='inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='h-6 w-6'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M7 16l-4-4m0 0l4-4m-4 4h18'
            ></path>
          </svg>
          <span className='ml-1 font-bold text-lg'>Back</span>
        </a>
        <div className='max-w-6xl mx-auto'>
          <h1 className='text-4xl font-bold text-center text-indigo-800 mb-8'>
            My Pokémon Team
          </h1>
          <div className='flex flex-col items-center justify-center py-20'>
            <div className='text-6xl mb-4'>👥</div>
            <h2 className='text-2xl font-semibold text-gray-600 mb-2'>
              No Pokémon in your team yet!
            </h2>
            <p className='text-gray-500 text-center max-w-md'>
              Start building your dream team by adding Pokémon from the main
              page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-8'>
      <a
        href='/'
        className='inline-flex items-center border border-indigo-300 px-3 py-1.5 rounded-md text-indigo-500 hover:bg-indigo-50'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M7 16l-4-4m0 0l4-4m-4 4h18'
          />
        </svg>
        <span className='ml-1 font-bold text-lg'>Back</span>
      </a>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-indigo-800 mb-2'>
            My Pokémon Team
          </h1>
          <p className='text-gray-600'>
            You have {team.length} Pokémon in your team
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12'>
          {team.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              pokemon={{
                name: pokemon.name,
                image: pokemon.image,
                types: pokemon.types,
              }}
            />
          ))}
        </div>

        {team.length > 0 && (
          <div className='bg-white rounded-lg p-6 shadow-md border border-gray-200'>
            <h3 className='text-xl font-semibold text-gray-800 mb-4 text-center'>
              Team Statistics
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-blue-600'>
                  {team.length}
                </div>
                <div className='text-sm text-gray-600'>Total Pokémon</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-purple-600'>
                  {Math.round((team.length / 6) * 100)}%
                </div>
                <div className='text-sm text-gray-600'>Team Complete</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

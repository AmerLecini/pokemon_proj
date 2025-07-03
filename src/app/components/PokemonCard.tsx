import Image from 'next/image';

import { usePokemonContext } from '@/context/PokemonContext';

interface PokemonProps {
  pokemon: {
    name: string;
    image: string;
    types: string;
  };
}

export const PokemonCard: React.FC<PokemonProps> = ({ pokemon }) => {
  const { team, addToTeam, removeFromTeam } = usePokemonContext();

  const isInTeam = team.some((p) => p.name === pokemon.name);

  return (
    <div className='flex flex-col items-center rounded-xl bg-white p-6 shadow-md border border-violet-400 transition-transform hover:scale-105 hover:shadow-xl'>
      <Image
        width={120}
        height={120}
        src={pokemon.image}
        alt={pokemon.name}
        className='mb-4 rounded-full border-4 border-yellow-400'
      />

      <h2 className='text-xl font-bold capitalize text-red-500 mb-2'>
        {pokemon.name}
      </h2>

      <p className='text-sm text-gray-600 mb-4 text-center'>
        <span className='font-medium text-blue-600'>Type:</span> {pokemon.types}
      </p>

      {!isInTeam ? (
        <button
          className='mt-auto rounded-full bg-green-500 px-4 py-1 text-white text-sm font-semibold transition hover:bg-green-600'
          onClick={(e) => {
            (addToTeam(pokemon), e.preventDefault());
            e.stopPropagation();
          }}
        >
          Add to team
        </button>
      ) : (
        <button
          className='mt-auto rounded-full bg-red-500 px-4 py-1 text-white text-sm font-semibold transition hover:bg-red-600'
          onClick={(e) => {
            (removeFromTeam(pokemon.name), e.preventDefault());
            e.stopPropagation();
          }}
        >
          Remove from team
        </button>
      )}
    </div>
  );
};

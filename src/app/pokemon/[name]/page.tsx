'use client';

import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PokemonDetails {
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  stats: { name: string; value: number }[];
}

interface EvolutionDetails {
  name: string;
  image: string;
}

const PokemonDetailsPage = ({ params }: { params: { name: string } }) => {
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionDetails[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${params.name}`,
        );
        const data = response.data;

        const formattedData: PokemonDetails = {
          name: data.name,
          image: data.sprites.front_default,
          types: data.types.map((type: any) => type.type.name),
          height: data.height,
          weight: data.weight,
          stats: data.stats.map((stat: any) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
        };

        setPokemon(formattedData);

        const speciesResponse = await axios.get(data.species.url);
        const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

        const evolutionResponse = await axios.get(evolutionChainUrl);
        const chain = await processEvolutionChain(evolutionResponse.data.chain);

        setEvolutionChain(chain);
      } catch (err) {
        setError('Oh no! The Poké Ball failed. Try again!');
      }
    };

    fetchPokemonDetails();
  }, [params.name]);

  const processEvolutionChain = async (
    chain: any,
  ): Promise<EvolutionDetails[]> => {
    const evolutions: EvolutionDetails[] = [];
    let current = chain;

    while (current) {
      const speciesResponse = await axios.get(current.species.url);
      const pokemonId = speciesResponse.data.id;
      const pokemonResponse = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
      );
      const image = pokemonResponse.data.sprites.front_default;

      evolutions.push({
        name: current.species.name,
        image,
      });

      current = current.evolves_to.length > 0 ? current.evolves_to[0] : null;
    }

    return evolutions;
  };
  if (error) {
    return (
      <div className='p-4 text-center'>
        <p className='text-red-500'>{error}</p>
        <button
          className='mt-4 text-black hover:underline'
          onClick={() => router.push('/')}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M7 16l-4-4m0 0l4-4m-4 4h18'
            ></path>
          </svg>
          <span>Back</span>
        </button>
      </div>
    );
  }

  if (!pokemon) {
    return <p className='p-4 text-center'>Loading Pokémon details...</p>;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-300 to-blue-500 p-6 text-gray-800'>
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

      <div className='mt-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 text-center'>
        <h1 className='text-4xl font-bold capitalize text-red-500 mb-4'>
          {pokemon.name}
        </h1>
        <Image
          width={200}
          height={200}
          src={pokemon.image}
          alt={pokemon.name}
          className='mx-auto mb-4'
        />

        <div className='mb-4 space-y-1 text-lg'>
          <p>
            <strong>Types:</strong> {pokemon.types.join(', ')}
          </p>
          <p>
            <strong>Height:</strong> {pokemon.height} dm
          </p>
          <p>
            <strong>Weight:</strong> {pokemon.weight} hg
          </p>
        </div>

        <h2 className='text-2xl font-bold text-blue-600 mt-6 mb-2'>Stats</h2>
        <ul className='grid grid-cols-2 gap-2 text-lg'>
          {pokemon.stats.map((stat) => (
            <li key={stat.name} className='capitalize'>
              {stat.name}: {stat.value}
            </li>
          ))}
        </ul>

        <h2 className='text-xl font-semibold mt-6 mb-4'>Evolution Chain</h2>
        {evolutionChain.length > 0 ? (
          <div className='flex overflow-x-auto gap-6 justify-center'>
            {evolutionChain.map((evolution) => (
              <div
                key={evolution.name}
                className='flex flex-col items-center bg-gradient-to-r from-pink-200 to-purple-300 p-4 rounded-lg shadow-md min-w-[160px]'
              >
                <Image
                  width={120}
                  height={120}
                  src={evolution.image}
                  alt={evolution.name}
                  className='mb-2'
                />
                <span className='capitalize font-medium'>{evolution.name}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No evolution chain available.</p>
        )}
      </div>
    </div>
  );
};

export default PokemonDetailsPage;

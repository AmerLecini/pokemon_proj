'use client';

import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface Pokemon {
  name: string;
  image: string;
  types: string;
}

interface PokemonContextProps {
  pokemonList: Pokemon[];
  filteredPokemon: Pokemon[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  team: Pokemon[];
  addToTeam: (pokemon: Pokemon) => void;
  removeFromTeam: (pokemonName: string) => void;
}

const PokemonContext = createContext<PokemonContextProps | undefined>(
  undefined,
);

export const PokemonProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [team, setTeam] = useState<Pokemon[]>(() => {
    if (typeof window !== 'undefined') {
      const storedTeam = localStorage.getItem('pokemonTeam');
      return storedTeam ? JSON.parse(storedTeam) : [];
    }
    return [];
  });

  const addToTeam = (pokemon: Pokemon) => {
    if (!team.find((p) => p.name === pokemon.name)) {
      setTeam((prevTeam) => [...prevTeam, pokemon]);
    }
  };

  const removeFromTeam = (pokemonName: string) => {
    setTeam((prevTeam) => prevTeam.filter((p) => p.name !== pokemonName));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('pokemonTeam', JSON.stringify(team));
    }
  }, [team]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0',
        );
        const results = response.data.results;

        const detailedPokemon: Pokemon[] = await Promise.all(
          results.map(async (pokemon: { name: string; url: string }) => {
            const details = await axios.get(pokemon.url);
            return {
              name: details.data.name,
              image: details.data.sprites.front_default,
              types: details.data.types
                .map((type: any) => type.type.name)
                .join(', '),
            };
          }),
        );

        setPokemonList(detailedPokemon);
        setFilteredPokemon(detailedPokemon);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    };

    fetchPokemon();
  }, []);

  useEffect(() => {
    const filtered = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredPokemon(filtered);
  }, [searchQuery, pokemonList]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        filteredPokemon,
        searchQuery,
        setSearchQuery,
        team,
        addToTeam,
        removeFromTeam,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (!context) {
    throw new Error('usePokemonContext must be used within a PokemonProvider');
  }
  return context;
};

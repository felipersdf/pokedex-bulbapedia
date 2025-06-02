import { api } from './api';

export const fetchPokemonList = async (offset = 0, limit = 20) => {
  const response = await api.get(`pokemon?offset=${offset}&limit=${limit}`);
  return response.data;
};

export const fetchPokemonDetails = async (idOrName: string) => {
  const response = await api.get(`pokemon/${idOrName}`);
  return response.data;
};

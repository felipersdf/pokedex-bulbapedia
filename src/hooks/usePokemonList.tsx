import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '../services/pokeApi';

export const usePokemonList = () =>
  useInfiniteQuery({
  queryKey: ['pokemon-list'],
  queryFn: ({ pageParam = 0 }) => fetchPokemonList(pageParam, 40),
  initialPageParam: 0,
  getNextPageParam: (lastPage) => {
    const nextOffset = lastPage?.next
      ? new URL(lastPage.next).searchParams.get('offset')
      : undefined;
    return nextOffset ? Number(nextOffset) : undefined;
  },
});


import { useQuery } from '@tanstack/react-query';
import { getMovies } from '../services/moviesApi';
import { useSearchParams } from 'react-router-dom';

// const average = (arr) =>
//   arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function useMovie(params) {
  const [searchParams] = useSearchParams();

  const sortByRaw = searchParams.get('sortBy') || 'total-desc';
  const [feild, direction] = sortByRaw.split('-');

  const directionOperator = direction === 'desc' ? -1 : 1;

  const sortBy = { feild, direction };

  //  Filter
  const watchedTogether = searchParams.get('watchedTogether') === 'true';

  let count;
  let filterdCount;

  //  Pagination
    // const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  let { data, isLoading } = useQuery({
    queryFn: getMovies,
    queryKey: ['movies'],
  });

  if (data) {
    data = data.map((movie) => {
      const average = (movie.mehdi + movie.ali + movie.mehrdad) / 3;
      movie.total = average.toFixed(2);
      return movie;
    });

    data = data.sort((a, b) => {
      return (a[sortBy.feild] - b[sortBy.feild]) * directionOperator;
    });

    
    
    if (watchedTogether) {
      data = data.filter(
        (movie) => movie.watchedTogether 
        );
      }
      
      count = data.length;
  }
  return { data, isLoading, count, filterdCount };
}

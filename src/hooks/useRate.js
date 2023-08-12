import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { rateMovie as rateMovieApi } from '../services/moviesApi';

export function useRate(params) {
  const queryClient = useQueryClient();
  const { mutate: rateMovie, isLoading: isRating } = useMutation({
    mutationFn: rateMovieApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['movies'],
      });
      toast.success('Movie successfully rated');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { rateMovie, isRating };
}

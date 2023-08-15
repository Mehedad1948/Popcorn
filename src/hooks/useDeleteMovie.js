import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletMovie as deletMovieApi } from '../services/moviesApi';
import { toast } from 'react-hot-toast';

export function useDeleteMovie(params) {
  const queryClient = useQueryClient();
  const { mutate: deleteMovie, isLoading: isDeleting } = useMutation({
    mutationFn: deletMovieApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['movies'],
      });
      toast.success(`Movie was successfully deleted`);
    },
    onError: () => {
      toast.error("Couldn't delete the movie");
    },
  });

  return { deleteMovie, isDeleting };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMusic as addMusicApi } from '../services/musicApi';
import { toast } from 'react-hot-toast';

export function useAddMusic(params) {
  const queryClient = useQueryClient();
  const { mutate: addMusic, isLoading: isAddingMusic } = useMutation({
    mutationFn: addMusicApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['musics'],
      });
      toast.success(`Music successfully added`);
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });

  return { addMusic, isAddingMusic };
}

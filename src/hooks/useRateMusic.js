import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rateMusic as rateMusicApi } from '../services/musicApi';
import { toast } from 'react-hot-toast';

export function useRateMusic(params) {
  const queryClient = useQueryClient();
  const { mutate: rateMusic, isLoading: isRatingMusic } = useMutation({
    mutationFn: rateMusicApi,
    onSuccess: ([data]) => {
      queryClient.invalidateQueries({
        queryKey: ['musics'],
      });
      toast.success(`Music ${data.name} was successfully rated`);
    },
  });

  return { rateMusic, isRatingMusic };
}

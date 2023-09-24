import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { deleteMusic as deleteMusicApi } from '../services/musicApi';

export function useDeleteMusic(params) {
  const { mutate: deleteMusic, isLoading: isDeletingMusic } = useMutation({
    mutationFn: deleteMusicApi,
    onSuccess: (data) => {
      toast.success(`Music was successfully deleted`);
    },
  });

  return { deleteMusic, isDeletingMusic };
}

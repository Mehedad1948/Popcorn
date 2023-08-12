import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMovie as addMovieApi } from '../services/moviesApi';
import { Toaster, toast } from 'react-hot-toast';

export function useAddMovie(params) {
    const queyClient = useQueryClient()
    const {mutate: addMovie, isLoading: isAddingMovie} = useMutation({
        mutationFn: addMovieApi,
        onSuccess: ([data]) => {
            toast.success(`Movie ${data.movie} successfully added`)
            queyClient.invalidateQueries({
                queryKey: ['movies']
            })
        }
    })

    return {addMovie, isAddingMovie}
}
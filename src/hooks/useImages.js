import { useQueries, useQuery } from '@tanstack/react-query';
import { getimages } from '../services/moviesApi';

export function useImages(params) {
    const {data} = useQuery({
        queryFn: getimages,
        queryKey: ['images']
    })


    return {data}
}
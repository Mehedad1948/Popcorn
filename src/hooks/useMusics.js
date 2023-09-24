import { useQuery } from '@tanstack/react-query';
import { getMusics } from '../services/musicApi';
import { useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../ui/ProtectedRoute';

function formatNumberWithMaxDecimalPlaces(number, maxDecimalPlaces) {
  const roundedNumber = parseFloat(number.toFixed(maxDecimalPlaces));
  return Number.isInteger(roundedNumber)
    ? roundedNumber.toString()
    : roundedNumber.toFixed(1);
}

export function useMusics(params) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { userName } = useContext(userContext);

  let { data, isLoading } = useQuery({
    queryFn: getMusics,
    queryKey: ['musics'],
  });

  const sortMusicBy = searchParams.get('sortMusicBy') || 'myRate';

  if (data) {
    data = data.map((music) => {
      const nonZeros = [music.mehdi, music.ali, music.mehrdad].filter(
        (i) => i !== 0
      ).length;
      const average =
        (music.mehdi + music.ali + music.mehrdad) /
        (nonZeros === 0 ? 1 : nonZeros);
      music.rating = formatNumberWithMaxDecimalPlaces(average, 1);
      return music;
    });

    if (sortMusicBy === 'myRate') {
      data = data.sort((a, b) => {
        return b[userName] - a[userName];
      });
    } 

    if (sortMusicBy === 'rating') {
      data = data.sort((a, b) => {
        return b.rating - a.rating;
      });
      
    }
  }
  return { data, isLoading };
}

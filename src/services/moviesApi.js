import supabase, { supabaseUrl } from './supabase';

export async function getMovies(params) {
  let { data, error } = await supabase.from('movies').select('*');

  if (error) {
    console.log('Error', error);
  }
  return data;
}

export async function addMovie({ year, movie, imdb }) {
  const { data, error } = await supabase
    .from('movies')
    .insert([{ year, movie, imdb }])
    .select();

  if (error) {
    console.log('Error', error);
  }
  return data;
}

export async function rateMovie({ updateObj, movieId }) {
  const rate = Object.values(updateObj)[0]
  if (rate > 10 || rate < 0) {
    throw new Error('Invalid Rate')
  }
  
  const { data, error } = await supabase
    .from('movies')
    .update(updateObj)
    .eq('id', movieId)
    .select();

  if (error) {
    console.error('Error updating ratings:', error);
    return;
  }
}

export async function deletMovie(id) {
  const { error } = await supabase
  .from('movies')
  .delete()
  .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

}

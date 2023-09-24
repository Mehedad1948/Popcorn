import supabase from './supabase';


export async function getMovies() {
  let query = supabase.from('movies').select('*', { count: 'exact' });

  // const from = (page - 1) * PAGE_SIZE;
  // const to = from + PAGE_SIZE - 1;
  // query = query.range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.log('Error', error);
  }

  return data
}

export async function addMovie({ year, movie, imdb, watchedTogether }) {
  const { data, error } = await supabase
    .from('movies')
    .insert([{ year, movie, imdb, watchedTogether }])
    .select();

  if (error) {
    console.log('Error', error);
  }
  return data;
}

export async function rateMovie({ updateObj, movieId }) {
  const rate = Object.values(updateObj)[0];
  if (rate > 10 || rate < 0) {
    throw new Error('Invalid Rate');
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
  const { error } = await supabase.from('movies').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}



// const publicImageUrl =
//   'https://pryognxulvntjaoeghoc.supabase.co/storage/v1/object/public/public-images/';

// export async function getimages(params) {
//   const { data, error } = await supabase.storage.from('public-images').list();

//   if (error) {
//     console.log(error);
//   }
//   const imagesUrl = data.map((image) => {
//     return {url: publicImageUrl + image.name, name: image.name}
//   });
//   imagesUrl.unshift({name: ''})

//   return { imagesUrl };
// }

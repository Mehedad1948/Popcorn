import supabase, { supabaseUrl } from './supabase';

export async function getMusics() {
  let { data, error } = await supabase.from('musics').select('*');

  if (error) {
    console.log('Error', error);
  }
  return data;
}

export async function rateMusic({ id, userName, rating }) {
  const { data, error } = await supabase
    .from('musics')
    .update({ [userName]: rating })
    .eq('id', id)
    .select();

  if (error) {
    console.log('rate error', error);
  }

  return data;
}

export async function addMusic({
  name,
  composer = 'Artist',
  cover,
  audioFile,
}) {
  let imagePath;
  let imageName;
  let uploadedCover;
  if (cover) {
    imageName = `${Math.random()}-${cover.name}`.replaceAll('/', '');
    imagePath = `${supabaseUrl}/storage/v1/object/public/images/${imageName}`;

    const { data, coverError } = await supabase.storage
      .from('images')
      .upload(imageName, cover, {
        cacheControl: '3600',
        upsert: false,
      });

    uploadedCover = data;

    if (coverError) {
      throw new Error(coverError.message);
    }
  } else {
    imagePath = './music-placeholder.jpg';
  }

  const audioPath = `${supabaseUrl}/storage/v1/object/public/public-files/${name}`;
  const { data: uploadedAudio, audioError } = await supabase.storage
    .from('public-files')
    .upload(name, audioFile, {
      cacheControl: '3600',
      upsert: false,
    });

  if (audioError) {
    throw new Error(audioError.message);
  }

  const { data, error } = await supabase
    .from('musics')
    .insert([{ name, composer, cover: imagePath, musicUrl: audioPath, coverName: imageName }])
    .select();

  if (error) {
    const { data, error: deleteAudioError } = await supabase.storage
    .from('public-files')
    .remove([name]);

  const { data: deletedCover, error: deleteCoverError } = await supabase.storage
    .from('images')
    .remove([imageName]);

    throw new Error(error.message)
  }


  return { data, uploadedAudio, uploadedCover };
}

export async function deleteMusic({ id, name, coverName }) {
  const { error } = await supabase.from('musics').delete().eq('id', id);

  const { data, error: deleteAudioError } = await supabase.storage
    .from('public-files')
    .remove([name]);

  const { data: deletedCover, error: deleteCoverError } = await supabase.storage
    .from('images')
    .remove([coverName]);

  if (deleteAudioError) {
    throw new Error(deleteAudioError.message);
  }

  if (deleteCoverError) {
    throw new Error(deleteCoverError.message);
  }

  if (error) {
    throw new Error(error.message);
  }

  return { data, deletedCover };
}

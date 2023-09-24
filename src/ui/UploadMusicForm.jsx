import { useState } from 'react';
import Button from './Button';
import Loading from './Loading';
import FormInput from './FormInput';
import { useAddMusic } from '../hooks/useAddMusic';
import { toast } from 'react-hot-toast';
import { BsImageFill, BsMusicNote } from 'react-icons/bs';

function UploadMusicForm({ onCloseModal }) {
  const [name, setName] = useState('');
  const [composer, setComposer] = useState();
  const [cover, setCover] = useState();
  const [audioFile, setAudioFile] = useState();

  const { addMusic, isAddingMusic } = useAddMusic();

  const handleCoverChange = (event) => {
    const file = event.target.files[0];
    setCover(file);
  };

  const handleAudioFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Here, you can use 'name', 'composer', 'cover', and 'audioFile'
    // to perform further actions, such as uploading the files or sending data to a server.
    if (name.length < 3) {
      toast.error('Please provide a valid name');
      return;
    }
    if (!audioFile) {
      toast.error('Please provide a music file');
      return;
    }

    addMusic(
      { name, composer, cover, audioFile },
      {
        onSuccess: (data) => {
          onCloseModal();
        },
      }
    );
  };

  return (
    <div className='mb-14 sm:mb-0 h-full overflow-y-auto sm:py-4'>
      <h2 className='mb-4 sm:text-lg sm:text-left text-center font-semibold'>
        Upload Music
      </h2>
      <form className='flex  flex-col gap-4 sm:gap-8' onSubmit={handleSubmit}>
        <FormInput label=' Name:'>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormInput>

        <FormInput label='Composer:'>
          <input
            type='text'
            value={composer}
            onChange={(e) => setComposer(e.target.value)}
          />
          <span className='text-xs text-rose-400 absolute top-1 sm:top-8 right-0 sm:right-auto sm:left-0'>
            (optional)
          </span>
        </FormInput>

        <FormInput htmlFor='cover' label='Cover Image:'>
          <div className='cursor-pointer flex items-center relatives gap-2 flex-wrap sm:flex-row flex-col'>
            <Button noEvent={true} size='small'>
              <span className='flex items-center gap-2'>
                <span> Upload Image </span> <BsImageFill />{' '}
              </span>
            </Button>
            <span className='text-xs text-rose-400 absolute top-2 right-0'>
              (optional)
            </span>
            <span className='grow overflow-hidden text-sm'>{cover?.name}</span>
            <input
              className='absolute w-0 h-0 opacity-0'
              id='cover'
              type='file'
              accept='image/*'
              onChange={handleCoverChange}
            />
          </div>
        </FormInput>

        <FormInput htmlFor='audio' label='Audio File:'>
          <div
            className='cursor-pointer flex sm:items-center justify-center sm:justify-start
          sm:flex-row flex-col gap-2 flex-wrap'
          >
            <Button noEvent={true} size='small'>
              <span className='flex items-center gap-2'>
                <span> Upload Music </span> <BsMusicNote />{' '}
              </span>
            </Button>
            <span className='grow overflow-hidden text-sm'>
              {audioFile?.name}
            </span>
            <input
              type='file'
              id='audio'
              className='absolute w-0 h-0 opacity-0'
              accept='audio/*'
              onChange={handleAudioFileChange}
            />
          </div>
        </FormInput>

        <Button size='full' type='submit'>
          {isAddingMusic ? 'Uploading...' : 'Upload'}
        </Button>
      </form>
    </div>
  );
}

export default UploadMusicForm;

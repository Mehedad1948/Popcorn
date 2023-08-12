import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useAddMovie } from '../hooks/useAddMovie';
import { toast } from 'react-hot-toast';
import Modal from './Modal';

function AddMovie() {
  const [showModal, setShowModal] = useState(false);
  const [movie, setmovie] = useState('');
  const [year, setYear] = useState(2023);
  const [imdb, setImdb] = useState(5);

  const { addMovie, isAddingMovie } = useAddMovie();

  function onConfirm(params) {
    if (movie.length < 2) {
      toast.error('Invalid movie name');
      setShowModal(false);
      return;
    }
    if (imdb < 0 && imdb > 10) {
      toast.error('Invalid imdb rate');
      setShowModal(false);
      return;
    }
    if (year < 1920 && imdb > 2100) {
      toast.error('Invalid movie year');
      setShowModal(false);
      return;
    }
    addMovie({ year, imdb, movie });
    setShowModal(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setShowModal((s) => !s);
  }

  return (
    <div className='border-2 px-4 py-4 border-blue-400 rounded-lg mt-5'>
      <span className='hidden'></span>
      {/* {showModal && ( */}
      <Modal
        onConfirm={onConfirm}
        setShowModal={setShowModal}
        year={year}
        imdb={imdb}
        movie={movie}
        showModal={showModal}
      />
      {/* )} */}
      <form className='flex flex-col gap-6 max-w-lg' action=' '>
        <FormInput label='Movie Name'>
          <input
            value={movie}
            onChange={(e) => setmovie(e.target.value)}
            type='text'
            minLength={3}
            required
          />
        </FormInput>
        <FormInput label='Release Year'>
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type='number'
            minLength={1910}
            maxLength={2050}
            required
          />
        </FormInput>
        <FormInput label='IMDB Rate'>
          <input
            value={imdb}
            onChange={(e) => setImdb(e.target.value)}
            type='number'
            minLength={0}
            maxLength={10}
            required
          />
        </FormInput>
        <button
          onClick={handleSubmit}
          className='bg-[#6741d9] w-full sm:w-fit px-3 py-2 rounded cursor-pointer
                hover:bg-[#5434b6] col-span-2 mr-0 mx-auto'
        >
          Add Movie
        </button>
      </form>
    </div>
  );
}

function FormInput({ children, label }) {
  return (
    <label className='peer grid place-items-center gap-1 sm:grid-cols-[0.4fr,_1fr] font-medium text-white'>
      <span className='peer-focus:text-[#6741d9] w-max'>{label}</span>
      {children}
    </label>
  );
}

export default AddMovie;

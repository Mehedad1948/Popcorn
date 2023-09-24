import { Link } from 'react-router-dom';
import Button from './Button';

function ErrorFallback() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-4'>
      <h1 className='text-xl font-semibold'>Something went wrong! 😶</h1>
      <Link
        to='/'
        className='px-4 transition-colors duration-300
                 hover:bg-[#5434b6] py-2 bg-purple-700 rounded'
      >
        Back to Home
      </Link>
      <Link
        to='/music'
        className='px-4 transition-colors duration-300
                 hover:bg-[#5434b6] py-2 bg-purple-700 rounded'
      >
        Go to Music
      </Link>
    </div>
  );
}

export default ErrorFallback;

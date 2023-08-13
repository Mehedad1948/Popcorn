import { useEffect, useState } from 'react';
import { useLogin } from './hooks/useLogin';
import { Link } from 'react-router-dom';
import { useUser } from './hooks/useUser';
import { useImages } from './hooks/useImages';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated } = useUser();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { login, isLoading } = useLogin();

  const { data } = useImages();

  const imagesUrl = data?.imagesUrl || [];

  useEffect(() => {
    if (imagesUrl.length !== 0) {
      const interval = 60 / (imagesUrl.length - 1);
      const newIndex = Math.floor(new Date().getMinutes() / interval);
      setCurrentImageIndex(newIndex + 1);
    }
  }, [imagesUrl]);

  function handleLoadImage(params) {
    setImgLoaded(true);
  }

  function handleLogin(e) {
    let email;
    e.preventDefault();
    switch (name.toLowerCase()) {
      case 'mehrdad':
        email = 'mnourib13@gmail.com';
        break;

      case 'ali':
        email = 'alisamimiat74@gmail.com';
        break;

      case 'mehdi':
        email = 'mnourib.13@gmail.com';
        break;

      default:
        break;
    }
    login({ email, password });
  }

  return (
    <div
      style={{
        backgroundImage: `url(lazy/${
          imagesUrl.length >0 ? imagesUrl[currentImageIndex].name : ''
        })`,
      }}
      className='w-full min-h-screen flex items-end sm:items-center justify-center 
                    fixed top-0 left-0 bg-cover bg-center'
    >
      {isAuthenticated && (
        <Link
          className='absolute text-sm px-3 py-1 rounded pb-0.5  w-fit sm:text-base 
                      top-4 right-4 sm:left-4 z-50 text-blue-400 bg-black/50 -backdrop-hue-rotate-15
                      outline-2 outline-blue-400'
          to='/'
        >
          Back to home
        </Link>
      )}
      {imagesUrl.length !== 0 && (
        <img
          onLoad={handleLoadImage}
          className={
            (imgLoaded ? 'opacity-100' : '') +
            ' ' +
            `w-screen absolute top-0 opacity-0 transition-opacity duration-1000 z-0
             h-screen object-cover`
          }
          src={imagesUrl[currentImageIndex].url}
          alt='Paradiso'
        />
      )}
      <div
        className='w-full sm:relative px-3 py-3 z-10 rounded-md border-2 shadow-md border-slate-800/20
                     bg-gray-800/30 backdrop-blur-sm sm:max-w-md fixed bottom-0 left-0'
      >
        <form className='w-full flex flex-col gap-5' action=''>
          <InputWrapper label='Name'>
            <input
              className='capitalize'
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper label='Password'>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputWrapper>
          <button
            onClick={handleLogin}
            className='bg-[#6741d9] w-full px-3 py-2 rounded cursor-pointer
           hover:bg-[#5434b6] col-span-2 mr-0 mx-auto'
          >
            {isLoading ? 'Login...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

function InputWrapper({ children, label }) {
  return (
    <div className='w-full flex flex-col gap-3'>
      <label className='text-blue-400'>{label}</label>
      {children}
    </div>
  );
}

export default Login;

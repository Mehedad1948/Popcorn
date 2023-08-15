import { useEffect, useState } from 'react';
import { useLogin } from './hooks/useLogin';
import { Link } from 'react-router-dom';
import { useUser } from './hooks/useUser';
import { images } from './utils/images';

function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated } = useUser();
  const { login, isLoading } = useLogin();

  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [imgLoaded, setImgLoaded] = useState(false);

  // function handleNextImage(params) {
  //   let nextImageIndex = (currentImageIndex + 1) % images.length;
  //   setCurrentImageIndex(nextImageIndex);
  // }

  // useEffect(() => {
  //   const interval = 60 / images.length;
  //   const newIndex = Math.floor(new Date().getMinutes() / interval);
  //   setCurrentImageIndex(newIndex);
  // }, [images]);

  // function handleLoadImage(params) {
  //   setImgLoaded(true);
  // }

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
      // style={{
      //   backgroundImage: `url(lazy/${
      //     images.length > 0 ? images[currentImageIndex].name : ''
      //   })`,
      // }}
      className='w-full min-h-screen flex items-end sm:items-center justify-center 
                    fixed top-0 left-0 bg-cover bg-center'
    >
      {isAuthenticated && (
        <Link
          className='absolute text-sm px-3 py-1 rounded pb-0.5  w-fit sm:text-base 
                      top-4 right-4 z-50 text-blue-400 bg-black/50 -backdrop-hue-rotate-15
                      outline-2 outline-blue-400'
          to='/'
        >
          Back to home
        </Link>
      )}

      {/* <button
        onClick={handleNextImage}
        className='fixed top-4 left-4  text-blue-400 bg-black/50
                         -backdrop-hue-rotate-15 z-50 text-sm px-3 py-1 rounded pb-0.5  w-fit sm:text-base'
      >
        Next Image
      </button> */}

      <img
        // onLoad={handleLoadImage}
        className={
          // (imgLoaded ? 'opacity-100' : '') +
          ' ' +
          `w-screen absolute top-0 opacity-100 transition-opacity duration-1000 z-0
             h-screen object-cover`
        }
        src='bat.jpg'
        alt='Paradiso'
      />

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
              autoComplete='username'
            />
          </InputWrapper>
          <InputWrapper label='Password'>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete='current-password'
            />
          </InputWrapper>
          <button
            onClick={handleLogin}
            className='bg-[#30156e] w-full px-3 py-2 rounded cursor-pointer
           hover:bg-[#26194b] col-span-2 mr-0 mx-auto'
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

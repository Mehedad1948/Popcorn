import { useState } from 'react';
import { useLogin } from './hooks/useLogin';
import Loading from './ui/Loading';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isLoading } = useLogin();

  function handleLogin(e) {
    e.preventDefault();
    login({ email, password });
  }



  return (
    <div className='w-full min-h-screen flex items-end sm:items-center justify-center fixed top-0 left-0'>
      <img
        className='w-screen absolute top-0 z-0 h-screen object-cover '
        src='/cp.webp'
        alt='Paradiso'
      />
      <div
        className='w-full relative px-3 py-3 z-10 rounded-md border-2 shadow-md border-slate-800/20
                     bg-gray-800/30 backdrop-blur-sm max-w-md'
      >
        <form className='w-full flex flex-col gap-5' action=''>
          <InputWrapper label='Email'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
           { isLoading ? 'Login...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

function InputWrapper({ children, label }) {
  return (
    <div className='w-full flex flex-col gap-3'>
      <label>{label}</label>
      {children}
    </div>
  );
}

export default Login;

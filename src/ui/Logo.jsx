import { useCheckVersion } from '../hooks/useCheckVersion';

function Logo() {
  const { isNewVersionAvailable, currentVersionState } = useCheckVersion();

  const handleUpdateClick = () => {
    navigator.serviceWorker.ready.then((registration) => {
      registration.active.postMessage({ type: 'SKIP_WAITING' });
    });
  };

  return (
    <div className='logo'>
      <span className='text-2xl' role='img'>
        🍿
      </span>
      <h1 className='sm:text-2xl text-lg font-semibold text-white'>
        <span>Paradiso</span>
        {currentVersionState !== 0 && (
          <sup className='text-xs sm:text-sm font-medium ml-1.5'>
            {currentVersionState}
          </sup>
        )}
      </h1>
      {isNewVersionAvailable && (
        <button
          onClick={handleUpdateClick}
          className='text-xs sm:text-sm bg-yellow-300/10 border border-yellow-300 px-1.5 py-0.5 rounded-full
                     text-yellow-300'
        >
          Update
        </button>
      )}
    </div>
  );
}

export default Logo;

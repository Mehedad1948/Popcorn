function SpinnerMini({ size }) {
  return (
    <>
      {size === 'small' ? (
        <span className='loader mx-auto relative z-50 inline-block !w-8 sm:!w-8 aspect-square'>
          {' '}
        </span>
      ) : (
        <span className='loader mx-auto relative z-50 inline-block !w-12 sm:!w-16 aspect-square'>
          {' '}
        </span>
      )}
    </>
  );
}

export default SpinnerMini;

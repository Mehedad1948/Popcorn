function Modal({ year, movie, imdb, watchedTogether, setShowModal, onConfirm, showModal }) {
  return (
    <div
      className={
        (showModal ? 'opacity-100 !z-10' : 'opacity-0') +
        ' ' +
        `bg-blue-950/10  backdrop-blur-sm w-screen -z-10 h-screen fixed top-0 left-0
           flex items-end sm:items-center justify-center sm:transition-opacity duration-300`
      }
    >
      <div
        className={
          (showModal ? 'translate-y-0 delay-150' : 'translate-y-full') +
          ' ' +
          `bg-[#333] !w-screen  rounded-lg sm:translate-y-0 sm:max-w-lg  flex flex-col gap-1 divide-y transition-transform duration-300 
           shadow-lg shadow-indigo-900/50 divide-[#6a4ebd]  sm:relative px-4
           fixed bottom-0 right-0 z-30 pb-16 sm:pb-2`
        }
      >
        <ConfirmRow label='Movie' data={movie} />
        <ConfirmRow label='Year' data={year} />
        <ConfirmRow label='IMDB Rate' data={imdb} />
        <ConfirmRow label='Watched togeter' data={watchedTogether ? 'Yes' : 'No'} />
        <div className='flex items-center py-2 gap-3 justify-end'>
          <button
            onClick={() => setShowModal(false)}
            className='bg-[#d9414e] w-fit px-3 py-2 rounded cursor-pointer
                  hover:bg-[#ff493c] col-span-2'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='bg-[#6741d9] w-fit px-3 py-2 rounded cursor-pointer
                  hover:bg-[#5434b6] col-span-2'
          >
            Add Movie
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmRow({ data, label }) {
  return (
    <div className='py-3 text-lg font-semibold'>
      <span className='mr-4'>{label}:</span>
      <span className='text-[#ff7535] tracking-wider text-lg'>{data}</span>
    </div>
  );
}

export default Modal;

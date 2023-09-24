function ConfirmDelete({ onCloseModal, name, onConfirm }) {
  return (
    <div>
      <p className='text-blue-100 mb-2 sm:text-lg'>Are you sure you wanna delete:</p>
      <p className='text-[#ff7535] mx-auto  font-semibold tracking-wider sm:text-lg'>
        {name}
      </p>
      <div className='flex items-center py-2 gap-3 justify-end'>
        <button
          onClick={onCloseModal}
          className='bg-[#d9414e] w-fit px-3 py-2 rounded cursor-pointer
                  hover:bg-[#ff493c] col-span-2'
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onConfirm()
            onCloseModal()
          }}
          className='bg-[#6741d9] w-fit px-3 py-2 rounded cursor-pointer
                  hover:bg-[#5434b6] col-span-2'
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;

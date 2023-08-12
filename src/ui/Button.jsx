function Button({onClick, children}) {
    return (
          <button
          onClick={onClick}
          className='bg-[#6741d9] w-fit px-3 py-3 rounded cursor-pointer text-white
           hover:bg-[#5434b6] col-span-2 mr-0 mx-auto font-semibold'
        >
          {children}
        </button>
    )
}

export default Button

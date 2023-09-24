const styles = {
  small: 'text-sm !py-1.5 !px-2 ml-0',
  full: '!w-full justify-center'
};
function Button({ onClick, children, size, disabled, noEvent }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        (noEvent ? 'pointer-events-none' : '') +
        ' ' +
        styles[size] +
        ' ' +
        `bg-[#6741d9] w-fit px-3 py-3 rounded cursor-pointer text-white
          flex items-center shrink-0 !text-center hover:bg-[#5434b6] col-span-2 mr-0 mx-auto 
          font-semibold `
      }
    >
      {children}
    </button>
  );
}

export default Button;

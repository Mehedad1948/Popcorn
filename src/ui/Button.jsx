const styles = {
  small: 'text-sm !py-1 !px-2 ml-0',
};
function Button({ onClick, children, size, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={
        styles[size] +
        ' ' +
        `bg-[#6741d9] w-fit px-3 py-3 rounded cursor-pointer text-white
          flex items-center    hover:bg-[#5434b6] col-span-2 mr-0 mx-auto font-semibold`
      }
    >
      {children}
    </button>
  );
}

export default Button;

import { memo } from 'react';

const FilterButton = memo(function ({
  onClick,
  active,
  disabled,
  children,
  count,
}) {
  return (
    <button
      className={`rounded bg-purple-700 px-2 py-1 text-sm sm:text-base 
         font-semibold text-white  sm:w-fit`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

export default FilterButton;

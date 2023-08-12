import { memo } from 'react';

const FilterButton =  memo(function ({ onClick, active, disabled, children, count }) {
  return (
    <button
      className={
        (active && `!bg-orange-700 !text-yellow-100`) +
        ' ' +
        `rounded border border-yellow-300 bg-yellow-200 px-2 py-1 
         font-semibold text-yellow-800`
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children} {count}
    </button>
  );
});

export default FilterButton;
import { useSearchParams } from 'react-router-dom';

function Select({ options, value, onChange, ...props }) {
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy');

  const isActive = !!options.find((option) => option.value === sortBy);

  return (
    <div>
      <select
        className={
          (isActive ? 'ring-2' : '') +
          ' ' +
          `rounded  bg-purple-700 text-sm sm:text-base ring-orange-500 border 
                focus:outline-none active:outline-none border-blue-400 px-2 py-1.5 sm:py-2`
        }
        value={value}
        onChange={onChange}
        {...props}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;

export default function FormInput({ children, label, htmlFor }) {
    return (
      <label
      htmlFor={htmlFor}
        className='peer grid place-items-center gap-1 sm:grid-cols-[0.4fr,_1fr] font-medium
                    text-left text-white sm:justify-items-start relative'
      >
        <span className='peer-focus:text-[#6741d9] w-max'>{label}</span>
        {children}
      </label>
    );
  }
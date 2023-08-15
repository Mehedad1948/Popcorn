import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../utils/useOutsideClick'
import { HiXMark } from 'react-icons/hi2';

export const ModalContext = createContext();

function ModalB({ children }) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);
  if (name !== openName) return null;

  return createPortal(
    <div
      className='fixed left-0 top-0 z-50 flex min-h-screen w-screen items-center
                 justify-center bg-stone-700/10 backdrop-blur-sm '
    >
      <div
        ref={ref}
        className={`bg-[#333] !w-screen rounded sm:rounded-md sm:translate-y-0 sm:max-w-lg  flex flex-col gap-1 divide-y transition-transform duration-300 
        shadow-lg shadow-indigo-900/50 divide-[#6a4ebd]  sm:relative
        fixed bottom-0 right-0 z-30 px-4 py-2`}
      >
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

ModalB.Open = Open;
ModalB.Window = Window;

export default ModalB;

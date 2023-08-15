import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import RectButton from './RectButton';
import { HiXMark } from 'react-icons/hi2';

export const ModalContext = createContext();

function Modal({ children }) {
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
      className="fixed left-0 top-0 z-50 flex min-h-screen w-screen items-center
                 justify-center bg-stone-700/10 backdrop-blur-sm "
    >
      <div
        ref={ref}
        className="flex max-w-2xl flex-col gap-2 rounded-lg border bg-orange-50 px-5 py-4 shadow-md ring-1
         ring-gray-950/10"
      >
        <button
          className="aspect-square self-end text-blue-500 rounded-full border-2 border-blue-400
                     transition-colors duration-300
                     px-0.5 hover:bg-blue-500 hover:text-slate-50 "
          onClick={close}
        >
          <HiXMark />
        </button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

import { createContext, useContext } from 'react';
import SpinnerMini from './SpinnerMini';
// import SpinnerMini from '../ui/SpinnerMini';

export const TableContext = createContext();

const tableStyle = {
  container: {
    primary: `rounded-lg  border-blue-400 drop-shadow-md`,
    secondary: `min-w-[800px]`,
  },
  header: {
    primary: `!bg-[#6741d9]`,
    secondary: `!bg-sky-100`,
  },
};

function Table({ children, columns, style = 'primary' }) {
  return (
    <TableContext.Provider value={{ columns, style }}>
      <div
        className={
          tableStyle.container[style] + ' ' + 'h-fit w-full overflow-hidden '
        }
      >
        <table className='block h-fit w-full text-white text-left '>
          {children}
        </table>
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { style } = useContext(TableContext);

  return (
    <thead className='block'>
      <Row className={`!bg-[#6741d9] text-white sticky top-0 uppercase`}>
        {children}
      </Row>
    </thead>
  );
}

function Row({ children, className = '' }) {
  const { columns } = useContext(TableContext);

  if (columns)
    return (
      <tr
        style={{ gridTemplateColumns: columns }}
        className={
          className +
          ' ' +
          `grid  sm:text-base lg:!text-lg w-full border-b-2 border-blue-400 px-2 py-2 sm:py-4 font-medium hover:bg-slate-800
         transition-all sm:px-4 text-center sm:text-left duration-300 last:border-b-0 items-center`
        }
      >
        {children}
      </tr>
    );
}

function Body({ data, render, isLoading }) {
  if (isLoading) {
    return (
      <tbody className='flex  py-2 sm:py-4'>
        <tr>
          <td className='px-8'>
            <SpinnerMini />
          </td>
        </tr>
      </tbody>
    );
  }

  if (!data?.length)
    return (
      <tbody>
        <tr>
          <td> No data to show </td>
        </tr>
      </tbody>
    );
  return <tbody className='block'>{data.map(render)}</tbody>;
}

function Footer({ children }) {
  return <div className=' mt-2'>{children}</div>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
export default Table;

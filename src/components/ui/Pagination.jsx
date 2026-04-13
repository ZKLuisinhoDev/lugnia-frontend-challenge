import React from 'react';
import { Paginator } from 'primereact/paginator';

const Pagination = ({ totalRecords, rowsPerPage, onPageChange, first }) => {
  return (
    <div className="flex justify-center mt-12 mb-8">
      <Paginator
        first={first || 0}
        rows={rowsPerPage}
        totalRecords={totalRecords}
        rowsPerPageOptions={[8, 12, 24, 48]}
        onPageChange={onPageChange}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] shadow-sm px-6 py-3 transition-colors duration-500"
        pt={{
          root: { className: 'bg-transparent border-none items-center' },
          pages: { className: 'flex gap-2 mx-4' },
          pageButton: ({ context }) => ({
            className: `w-10 h-10 rounded-xl transition-all duration-300 font-bold border-none text-sm flex items-center justify-center ${
              context.active 
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-200 dark:shadow-none scale-110' 
                : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
            }`
          }),
          RPPDropdown: {
            root: { className: 'h-10 ml-6 border border-gray-100 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 px-3 hover:border-cyan-500 transition-colors' },
            input: { className: 'font-black text-gray-700 dark:text-gray-200 text-xs flex items-center h-full' },
            trigger: { className: 'w-4 h-full flex items-center justify-center text-gray-400' }
          },
          firstPageButton: { className: 'w-10 h-10 text-gray-400 dark:text-gray-600 hover:text-cyan-600 transition-colors' },
          prevPageButton: { className: 'w-10 h-10 text-gray-400 dark:text-gray-600 hover:text-cyan-600 transition-colors' },
          nextPageButton: { className: 'w-10 h-10 text-gray-400 dark:text-gray-600 hover:text-cyan-600 transition-colors' },
          lastPageButton: { className: 'w-10 h-10 text-gray-400 dark:text-gray-600 hover:text-cyan-600 transition-colors' }
        }}
      />
    </div>
  );
};

export default Pagination;

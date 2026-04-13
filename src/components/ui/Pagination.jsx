import React from 'react';
import { Paginator } from 'primereact/paginator';

const Pagination = ({ totalRecords, rowsPerPage, onPageChange, first }) => {
  return (
    <div className="flex justify-center mt-8">
      <Paginator
        first={first || 0}
        rows={rowsPerPage}
        totalRecords={totalRecords}
        rowsPerPageOptions={[8, 12, 24, 48]}
        onPageChange={onPageChange}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        className="shadow-sm border-gray-200 rounded-xl bg-white"
      />
    </div>
  );
};

export default Pagination;

import React, { useRef } from "react";
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useFilters,
} from "react-table";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PropTypes from 'prop-types';

function CustomTable({ columns, data, searchEnabled }) {
  const {
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, globalFilter, pageSize },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const inputRef = useRef();

  return (
    <div className="bg-white p-5 rounded-xl">
      {searchEnabled && (
        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            className="border-0.5 border-gray-300 px-3 py-2"
            value={globalFilter || ""}
            onChange={(e) => {
              setGlobalFilter(e.target.value || undefined);
            }}
            placeholder={`Search...`}
          />
          {globalFilter && (
            <button
              className="ml-2 text-gray-300 hover:text-gray-600"
              onClick={() => {
                setGlobalFilter("");
              }}
            >
              &#x2715;
            </button>
          )}
        </div>
      )}

      <table className="table-auto w-full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span>{column.render("Header")}</span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <span>↓</span>
                      ) : (
                        <span>↑</span>
                      )
                    ) : (
                      <span style={{ width: '20px' }} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            {headerGroups.map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <td key={column.id} className="px-4 py-2">
                    <input
                      type="text"
                      className="border border-gray-300 px-2 py-1"
                      onChange={(e) => {
                        column.setFilter(e.target.value || "");
                      }}
                      placeholder="Filter"
                    />
                  </td>
                ))}
              </React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td key={cell.id} {...cell.getCellProps()} className="px-4 py-2">
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex items-center justify-center mt-4 space-x-2">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-2 py-1 border border-gray-300"
        >
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={50}>50 per page</option>
        </select>
        <span className="text-sm">
          Page <strong>{pageIndex + 1}</strong> of <strong>{pageCount}</strong>
        </span>
        <button
          className="px-2 py-1 disabled:opacity-50"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          1
        </button>{" "}
        <button
          className="px-2 py-1 disabled:opacity-50"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <FiChevronLeft />
        </button>{" "}
        <button
          className="px-2 py-1 disabled:opacity-50"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <FiChevronRight />
        </button>{" "}
        <button
          className="px-2 py-1 disabled:opacity-50"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          last
        </button>{" "}
      </div>
    </div>
  );
}

CustomTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchEnabled: PropTypes.bool,
};

CustomTable.defaultProps = {
  searchEnabled: true,
};

export default CustomTable;

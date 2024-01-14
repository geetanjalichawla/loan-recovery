// import React, { useState, useEffect } from 'react';
// import { BASE_URL } from '../../main';
// import axios from "axios";

// const Pagination = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchData();
//   }, [currentPage]);

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${currentPage}`);
//       const result = await response.json();

//       setData(result.data);
//       setTotalPages(result.total_pages);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   return (

//       <div>
//         <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
//           Prev
//         </button>
//         <span>{`Page ${currentPage} of ${totalPages}`}</span>
//         <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
//           Next
//         </button>
//       </div>
//   );
// };

// export default Pagination;

// Pagination.js

import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="flex justify-center my-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        className={`mx-1 px-3 py-2 rounded-md ${
          currentPage === 1
            ? "bg-gray-300 text-black cursor-not-allowed"
            : "bg-blue-500 text-white"
        } hover:bg-blue-700 transition`}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-2 rounded-md ${
            page === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-black"
          } hover:bg-blue-700 transition`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        className={`mx-1 px-3 py-2 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-300 text-black cursor-not-allowed"
            : "bg-blue-500 text-white"
        } hover:bg-blue-700 transition`}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

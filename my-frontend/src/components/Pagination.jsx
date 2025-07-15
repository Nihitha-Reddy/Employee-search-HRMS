import React from "react";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalPages,
  totalRecords,
  pageSize,
  onPageChange
}) => {
  const pages = [];

  const maxPagesToShow = 10;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = startPage + maxPagesToShow - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <button
        key={i}
        className={`page-btn ${i === currentPage ? "active" : ""}`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  return (
    <div className="pagination-footer">
      <div className="results">
        Showing {startRecord}–{endRecord} of {totalRecords}
      </div>

      <div className="pagination-bar">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ⬅ Prev
        </button>

        {pages}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default Pagination;

/* eslint-disable react/prop-types */
import React from "react";
import Buttom from "@atoms/Button.jsx";

const PaginationURL = ({
  handlePrevPage,
  handleNextPage,
  totalPages,
  currentPage,
  goToPage,
  className,
}) => {
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <section
      className={`mt-4 flex justify-end items-center gap-1 px-1 text-sm ${className}`}
    >
      <Buttom
        label="Anterior"
        onClick={handlePrevPage}
        variant="navbar"
        disabled={currentPage === 1}
        className="mx-0"
      />

      {generatePageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-2 text-gray-500">{page}</span>
          ) : (
            <Buttom
              label={page.toString()}
              onClick={() => {
                goToPage(page);
              }}
              variant="navbar"
              className={`flex px-2 py-1 rounded-md w-9 h-9 justify-center items-center ${
                page === currentPage ? "btnSecondary" : "hover:bg-gray-200"
              }`}
              disabled={page === currentPage}
            />
          )}
        </React.Fragment>
      ))}

      <Buttom
        label="Siguiente"
        onClick={handleNextPage}
        variant="navbar"
        disabled={currentPage === totalPages}
        className="mx-0"
      />
    </section>
  );
};

export default PaginationURL;

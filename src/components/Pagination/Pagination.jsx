/* eslint-disable react/prop-types */

import { CircleArrowLeft, CircleArrowRight } from "lucide-react";

const Pagination = ({
  pdfReport,
  handlePrevious,
  pages,
  handleNext,
  handlePageClick,
  pageNumbers,
}) => {
  return (
    <div className="flex justify-start items-center mt-4">
      <button
        onClick={handlePrevious}
        disabled={pages === 1}
        className={`px-4 py-2 rounded ${
          pages === 1 ? "text-gray-400" : " text-white"
        } `}
      >
        <CircleArrowLeft />
      </button>
      <div className="join">
        {pageNumbers?.map((number) => (
          <button
            key={number}
            onClick={() => handlePageClick(number)}
            className={` size-10  rounded-full mx-1 ${
              pages === number ? "bg-sky-500  text-white " : "ring-1 ring-white "
            }`}
          >
            {number}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        disabled={pages === pdfReport?.totalPages}
        className={`px-4 py-2 rounded ${
          pages === pdfReport?.totalPages ? "text-gray-400" : " text-white"
        } `}
      >
        <CircleArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
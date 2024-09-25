import React from "react";
import {
  MdKeyboardDoubleArrowUp,
  MdKeyboardDoubleArrowDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

function PaginationBar({
  currentPage,
  totalTasks,
  tasksPerPage,
  onPageChange,
  onTasksPerPageChange,
}) {
  const totalPages = Math.ceil(totalTasks / tasksPerPage) || 1;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleFirstPage = () => onPageChange(1);
  const handleLastPage = () => onPageChange(totalPages);

  const handleTasksPerPageChange = (event) => {
    onTasksPerPageChange(Number(event.target.value));
  };

  return (
    <div className="flex justify-between bg-[#f2f2f2] px-4 py-2 w-screen fixed bottom-0 border-t-2 border-gray-300">
      <div>
        <select
          value={tasksPerPage}
          onChange={handleTasksPerPageChange}
          className="select select-bordered bg-[#ffffff9c] w-full max-w-xs focus-within:outline-none"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className="join">
        <button
          className="bg-[#ffffff9c] join-item btn"
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          <MdKeyboardDoubleArrowDown /> First
        </button>
        <button
          className="bg-[#ffffff9c] join-item btn"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <MdKeyboardArrowLeft /> Prev
        </button>
        <button className="bg-[#ffffff9c] join-item btn">
          {currentPage} / {totalPages}
        </button>
        <button
          className="bg-[#ffffff9c] join-item btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next <MdKeyboardArrowRight />
        </button>
        <button
          className="bg-[#ffffff9c] join-item btn"
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          Last <MdKeyboardDoubleArrowUp />
        </button>
      </div>
    </div>
  );
}

export default PaginationBar;

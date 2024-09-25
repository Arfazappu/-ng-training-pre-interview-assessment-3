import React from "react";
import todoIcon from "../../../assets/images/checklist.png";
import Button from "../button/Button";

function TopBar({ openNewTaskModal, tasks }) {
  return (
    <div className="bg-[#f2f2f2] px-4 py-2 border-b-2 border-gray-300">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-start gap-1">
          <img src={todoIcon} alt="Logo" className="w-10" />
          <div>
            <div className="text-xl font-semibold text-slate-600">Tasks</div>
            <span className="text-sm font-medium text-slate-500">
              All Tasks
            </span>
          </div>
        </div>

        <div className="join join-horizontal">
          <Button
            btnText="New task"
            customClass="join-item px-8"
            onClick={openNewTaskModal}
          />
          <Button btnText="Refresh" customClass="join-item px-8" />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="text-md text-slate-500 p-1">{tasks.length} records</div>

        <label className="input input-bordered flex items-center gap-2 focus-within:outline-none">
          <input type="text" className="grow" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
    </div>
  );
}

export default TopBar;

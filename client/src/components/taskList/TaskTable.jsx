import React from "react";
import { TableMockData } from "./TableMockData.js";
import { MdOutlineArrowDropDown } from "react-icons/md";

function TaskTable({ tasks, onEditTask, onDeleteTask }) {
  return (
    // <div className="max-h-96 overflow-x-auto  border-2 border-gray-300">
    <div>
      <table className="table">
        <thead>
          <tr className="border-b-2">
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks.map((task, index) => (
              <tr key={task.id} className={index != tasks.length - 1 ? `border-b-2`: ''}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td className="text-blue-500">{task?.assignedTo}</td>
                <td>{task?.status}</td>
                <td>{task?.dueDate}</td>
                <td>{task?.priority}</td>
                <td className="max-w-28 truncate whitespace-nowrap overflow-hidden">
                  {task?.comment || '--no-comment--'}
                </td>
                <td>
                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="m-1 w-6">
                    <MdOutlineArrowDropDown size={20}/>
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-[1] w-28 p-2 shadow"
                    >
                      <li onClick={() => onEditTask(task)}>
                        <a>Edit</a>
                      </li>
                      <li className="text-red-500" onClick={() => onDeleteTask(task)}>
                        <a>Delete</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskTable;

import React, { useState, useEffect } from "react";
import Button from "../uiComponents/button/Button";
import { RxCross2 } from "react-icons/rx";

function TaskForm({ isOpen, closeModal, onSave, task }) {    
  const [taskData, setTaskData] = useState({
    assignedTo: "",
    status: "Not Started",
    dueDate: new Date().toISOString().split("T")[0],
    priority: "Normal",
    comment: "",
  });

  const [errors, setErrors] = useState({});


  useEffect(() => {
    if (task) {
      setTaskData({
        assignedTo: task.assignedTo || "",
        status: task.status || "Not Started",
        dueDate: task.dueDate || new Date().toISOString().split("T")[0],
        priority: task.priority || "Normal",
        comment: task.comment || "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    const newErrors = {};

    if (!taskData.assignedTo) {
      newErrors.assignedTo = "Assigned To is required";
    }
    if (!taskData.status) {
      newErrors.status = "Status is required";
    }
    if (!taskData.priority) {
      newErrors.priority = "Priority is required";
    }

    setErrors(newErrors);

    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateFields()) {
      onSave(taskData);
      closeModal();

      resetForm();
    }
  };

  const handleClose = () => {
    resetForm();
    closeModal();
  }

  const resetForm = () => {
    setTaskData({
      assignedTo:"",
      status: "Not Started",
      dueDate:new Date().toISOString().split("T")[0], 
      priority:"Normal",
      comment:"",
    })
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white rounded shadow-lg w-full max-w-2xl relative">

      <div 
        className="absolute top-0 right-0 cursor-pointer p-1" 
        onClick={handleClose} 
      >
        <RxCross2 size={20}/>
      </div>

        <h2 className="bg-[#f2f2f2] text-2xl font-bold mb-6 text-center border-b-2 p-4">
          {task ? "Edit Task" : "New Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="px-4">
            {/* Assigned To */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium my-1">
                  <span className="text-red-500"> *</span> Assigned To
                </label>
                <select
                  name="assignedTo"
                  value={taskData.assignedTo}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select a User</option>
                  <option value="User 1">User 1</option>
                  <option value="User 2">User 2</option>
                  <option value="User 3">User 3</option>
                  <option value="User 4">User 4</option>
                </select>
                {errors.assignedTo && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.assignedTo}
                  </p>
                )}
              </div>

              {/* Status */}
              <div className="flex flex-col">
                <label className="font-medium my-1">
                  <span className="text-red-500"> *</span> Status
                </label>
                <select
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option>Not Started</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">{errors.status}</p>
                )}
              </div>
            </div>

            {/* Due Date */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="font-medium my-1">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={taskData.dueDate}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                />
              </div>

              {/* Priority */}
              <div className="flex flex-col">
                <label className="font-medium my-1">
                  <span className="text-red-500"> *</span> Priority
                </label>
                <select
                  name="priority"
                  value={taskData.priority}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="">Select a Priority</option> {/* Empty option */}
                  <option>Low</option>
                  <option>Normal</option>
                  <option>High</option>
                </select>
                {errors.priority && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.priority}
                  </p>
                )}
              </div>
            </div>

            {/* Comments */}
            <div className="flex flex-col">
              <label className="font-medium my-1">Description</label>
              <textarea
                name="comment"
                value={taskData.comment}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-2 h-24"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end bg-[#f2f2f2] space-x-4 mt-4 border-t-2 p-3">
            <Button type='button' btnText="Cancel" onClick={handleClose} />
            <Button
              btnText={task ? "Save Changes" : "Save"}
              type="submit"
              variant="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;

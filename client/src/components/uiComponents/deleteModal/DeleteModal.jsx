import React from 'react';

function DeleteModal({ isOpen, onClose, onDelete, task }) {
  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete(task.id); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete the task: <strong>{task.assignedTo}</strong>?</p>
        <div className="flex justify-end mt-4">
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;

import React from 'react';
import Button from '../button/Button';
import { RxCross2 } from 'react-icons/rx';

function DeleteModal({ isOpen, onClose, onDelete, task }) {
  if (!isOpen) return null;

  const handleDelete = () => {
    onDelete(task.id); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg relative overflow-hidden">
      <div 
        className="absolute top-0 right-0 cursor-pointer p-1" 
        onClick={onClose} 
      >
        <RxCross2 color='white' size={20}/>
      </div>
        <h2 className="bg-red-500 text-white p-4 text-xl text-center font-semibold mb-4">Delete</h2>
        <p className='px-4 py-2'>Are you sure you want to delete the task: <strong>{task.assignedTo}</strong>?</p>
        <div className="flex justify-end mt-4 px-4 py-2">
          <Button btnText='No' variant='primary' onClick={onClose} customClass='mx-1'/>
          <Button btnText='Yes' onClick={handleDelete}/>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;

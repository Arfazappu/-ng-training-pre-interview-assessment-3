import React, { useState } from "react";
import TopBar from "../components/uiComponents/topBar/TopBar";
import TaskTable from "../components/taskList/TaskTable";
import PaginationBar from "../components/uiComponents/paginationBar/PaginationBar";
import TaskForm from "../components/taskForm/TaskForm";
import DeleteModal from "../components/uiComponents/deleteModal/DeleteModal";

function TaskPage() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage, setTasksPerPage] = useState(5);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const openModal = (task = null) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSaveTask = (taskData) => {
    if (currentTask) {
      // Editing existing task
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === currentTask.id ? taskData : task))
      );
    } else {
      // Adding new task
      setTasks([...tasks, { id: Date.now(), ...taskData }]);
    }
  };

  const handleEditTask = (task) => {
    openModal(task);
  };

  // Get the current tasks for the page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  const handleTasksPerPageChange = (newTasksPerPage) => {
    setTasksPerPage(newTasksPerPage);
    setCurrentPage(1);
  };

  const handleDeleteTask = (taskId) => {
    // console.log("Deleting task with ID:", taskId); // Debug log
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    // console.log("Updated tasks after deletion:", updatedTasks); // Debug log
    setTasks(updatedTasks);
    closeDeleteModal();
  };

  const openDeleteModal = (task) => {
    // console.log("Opening delete modal for task:", task); // Debug log
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };


  return (
    <div>
      <TopBar openNewTaskModal={() => openModal()} tasks={tasks} />
      <TaskTable
        tasks={currentTasks}
        onEditTask={handleEditTask}
        onDeleteTask={openDeleteModal}
      />
      <PaginationBar
        currentPage={currentPage}
        totalTasks={tasks.length}
        tasksPerPage={tasksPerPage}
        onPageChange={handlePageChange}
        onTasksPerPageChange={handleTasksPerPageChange}
      />

      <TaskForm
        isOpen={isModalOpen}
        closeModal={closeModal}
        onSave={handleSaveTask}
        task={currentTask}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteTask}
        task={taskToDelete}
      />

    </div>
  );
}

export default TaskPage;

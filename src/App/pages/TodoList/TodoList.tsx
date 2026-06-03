import styles from './TodoList.module.scss';
import Add from '../../../assets/icons/add.svg?react';
import { AddEditTaskModal } from './components/AddEditTaskModal/AddEditTaskModal';
import { Button } from './components/Button/Button';
import { DeleteModal } from './components/DeleteModal/DeleteModal';
import { TaskCard } from './components/TaskCard/TaskCard';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';

import {
  addTask,
  closeAddEditModal,
  closeDeleteModal,
  confirmDeleteTask,
  editStatus,
  editTask,
  openAddModal,
  openDeleteModal,
  openEditModal,
} from './features/todoSlice';

export const TodoList = () => {
  const dispatch = useAppDispatch();

  const {
    tasks,
    showDeleteModal,
    showAddEditModal,
    taskToChange,
    isEditing,
  } = useAppSelector((state) => state.todo);

  return (
    <>
      <div className={styles['page-wrapper']}>
        <div className={styles['top-title']}>
          <h2>Список задач</h2>

          <Button
            title="Добавить задачу"
            icon={<Add />}
            onClick={() => {
              dispatch(openAddModal());
            }}
          />
        </div>

        <div className={styles['task-container']}>
          {tasks.map((task) => (
            <TaskCard
              task={task}
              key={task.id}
              editStatus={() => {
                dispatch(editStatus(task.id));
              }}
              onClick={() => {
                dispatch(openEditModal(task));
              }}
              onDelete={() => {
                dispatch(openDeleteModal(task.id));
              }}
            />
          ))}
        </div>
      </div>

      {showAddEditModal && (
        <AddEditTaskModal
          isEditing={isEditing}
          updateTask={taskToChange}
          addTask={(newTask) => {
            dispatch(addTask(newTask));
          }}
          editTask={(updatedTask) => {
            dispatch(editTask(updatedTask));
          }}
          onClose={() => {
            dispatch(closeAddEditModal());
          }}
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          onExit={() => {
            dispatch(closeDeleteModal());
          }}
          onDelete={() => {
            dispatch(confirmDeleteTask());
          }}
        />
      )}
    </>
  );
};
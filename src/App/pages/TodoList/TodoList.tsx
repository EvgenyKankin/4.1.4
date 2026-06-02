import styles from  './TodoList.module.scss';
import Add from '../../../assets/icons/add.svg?react';
import { AddEditTaskModal } from './components/AddEditTaskModal/AddEditTaskModal';
import { Button } from './components/Button/Button';
import { DeleteModal } from './components/DeleteModal/DeleteModal';
import { TaskCard } from './components/TaskCard/TaskCard';
import { taskList as initialTaskList} from './shared/serverData/taskList';
import type { Task } from './shared/serverData/taskList';
import { Status } from './shared/types';
import { useState } from 'react';

export const TodoList = () => {
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [tasks, setTasks] = useState(initialTaskList);
  const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);
  const [taskIdToChange, setTaskIdToChange] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTasks = (newTask: Task) => {
    setIsEditing(false);
    setTasks((tasks) => [newTask, ...tasks]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTaskIdToDelete(taskId);
    setshowDeleteModal(true);
  };

  const confirmDeleteTask = () => {
    if (taskIdToDelete) {
      const updateTasks = tasks.filter((task) => task.id !== taskIdToDelete);
      setTasks(updateTasks); // Удаляем задачу
    }
    setshowDeleteModal(false);
    setTaskIdToDelete(null);
  };

  const showEditMode = (task: Task) => {
    setIsEditing(true);
    setTaskIdToChange(task);
    setShowAddEditModal(true);
  };

  const changeTask = (updatedTask: Task) => {
    if (taskIdToChange) {
      const taskIndex = tasks.findIndex(
        (task) => task.id === taskIdToChange.id
      );
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = updatedTask;

        setTasks(updatedTasks);
      }

      setTaskIdToChange(null);
      setIsEditing(false);
    }
  };

  const editStatus = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status:
                task.status === Status.TODO
                  ? Status.PROGRESS
                  : task.status === Status.PROGRESS
                  ? Status.DONE
                  : Status.TODO,
            }
          : task
      )
    );
  };

  return (
    <>
      <div className={styles["page-wrapper"]}>
        <div className={styles["top-title"]}>
          <h2>Список задач</h2>
          <Button
            title="Добавить задачу"
            icon={<Add />}
            onClick={() => {
              setShowAddEditModal(true);
            }}
          />
        </div>
        <div className={styles["task-container"]}>
          {tasks.map((task) => (
            <TaskCard
              task={task}
              key={task.id}
              editStatus={() => editStatus(task.id)}
              onClick={() => showEditMode(task)}
              onDelete={() =>
                handleDeleteTask(task.id)
              }
            />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskModal
          isEditing={isEditing}
          updateTask={taskIdToChange}
          addTask={(newTask) => {
            handleAddTasks(newTask);
          }}
          editTask={changeTask}
          onClose={() => {
            setShowAddEditModal(false);
            setIsEditing(false);
          }}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onExit={() => {
            setshowDeleteModal(false);
          }}
          onDelete={confirmDeleteTask}
        />
      )}
    </>
  );
};

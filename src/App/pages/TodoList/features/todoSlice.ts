import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { taskList as initialTaskList, type Task } from '../shared/serverData/taskList';
import { Status } from '../shared/types';

type TodoState = {
  tasks: Task[];
  showDeleteModal: boolean;
  showAddEditModal: boolean;
  taskIdToDelete: string | null;
  taskToChange: Task | null;
  isEditing: boolean;
};

const initialState: TodoState = {
  tasks: initialTaskList,
  showDeleteModal: false,
  showAddEditModal: false,
  taskIdToDelete: null,
  taskToChange: null,
  isEditing: false,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.showAddEditModal = true;
      state.isEditing = false;
      state.taskToChange = null;
    },

    closeAddEditModal: (state) => {
      state.showAddEditModal = false;
      state.isEditing = false;
      state.taskToChange = null;
    },

    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
      state.isEditing = false;
    },

    openDeleteModal: (state, action: PayloadAction<string>) => {
      state.taskIdToDelete = action.payload;
      state.showDeleteModal = true;
    },

    closeDeleteModal: (state) => {
      state.showDeleteModal = false;
      state.taskIdToDelete = null;
    },

    confirmDeleteTask: (state) => {
      if (!state.taskIdToDelete) {
        return;
      }

      state.tasks = state.tasks.filter(
        (task) => task.id !== state.taskIdToDelete
      );

      state.showDeleteModal = false;
      state.taskIdToDelete = null;
    },

    openEditModal: (state, action: PayloadAction<Task>) => {
      state.isEditing = true;
      state.taskToChange = action.payload;
      state.showAddEditModal = true;
    },

    editTask: (state, action: PayloadAction<Task>) => {
      const updatedTask = action.payload;

      const taskIndex = state.tasks.findIndex(
        (task) => task.id === updatedTask.id
      );

      if (taskIndex !== -1) {
        state.tasks[taskIndex] = updatedTask;
      }

      state.taskToChange = null;
      state.isEditing = false;
    },

    editStatus: (state, action: PayloadAction<string>) => {
      const taskId = action.payload;

      const task = state.tasks.find((task) => task.id === taskId);

      if (!task) {
        return;
      }

      if (task.status === Status.TODO) {
        task.status = Status.PROGRESS;
      } else if (task.status === Status.PROGRESS) {
        task.status = Status.DONE;
      } else {
        task.status = Status.TODO;
      }
    },
  },
});

export const {
  openAddModal,
  closeAddEditModal,
  addTask,
  openDeleteModal,
  closeDeleteModal,
  confirmDeleteTask,
  openEditModal,
  editTask,
  editStatus,
} = todoSlice.actions;

export default todoSlice.reducer;
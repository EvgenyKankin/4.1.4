import { Prioroty, Status } from '../../../shared/types';
import { MouseEventHandler} from 'react';
import { Task } from '../../../shared/serverData/taskList';
export interface AddEditTaskModalProps {
  onClose: MouseEventHandler<HTMLButtonElement>;
  addTask: (newTask: AddEditTaskProps) => void
  editTask: (
    updatedTask: AddEditTaskProps
  ) => void
  isEditing: boolean;
  updateTask: Task | null;
}
export interface AddEditTaskProps {
  id: string;
  title: string;
  priority: Prioroty;
  status: Status;
  progress: number;
}
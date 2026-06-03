import { CloseButton } from './CloseButton/CloseButton';
import { Button } from '../../components/Button/Button';
import { Input } from './Input/Input';
import { Modal } from '../../shared/Modal/Modal';
import styles from './AddEdit.module.scss';
import React, { useState } from 'react';
import { Prioroty, Status } from '../../shared/types';
import type {AddEditTaskModalProps, AddEditTaskProps } from './helpers/interface.tsx';

export const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({
  onClose,
  addTask,
  isEditing,
  updateTask,
  editTask,
}) => {
  const [stateInputValue, setStateInputValue] = useState(
    isEditing && updateTask ? updateTask.title : ''
  );
  
  const [statePriority, setStatePriority] = useState<Prioroty | ''>(
  isEditing && updateTask ? updateTask.priority : ''
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStateInputValue(
      event.target.value
    );
  };

  const generateUniqueId = () => {
    return Date.now().toString();
  };

  const handlePriorityClick = (priority: Prioroty) => {
    console.log(`Клик на приоритете: ${priority}`);
    setStatePriority(priority);
  };

  const handleClickAddTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    
    event.preventDefault();
    if (!stateInputValue || !statePriority) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }
    const newTask: AddEditTaskProps = {
      id: generateUniqueId(),
      title: stateInputValue,
      priority: statePriority as Prioroty,
      status: Status.TODO,
      progress: 0,
    };

    addTask(newTask);
    onClose(event);
    setStateInputValue('');
    setStatePriority('');
  };

  const handleClickEditTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    /*Редактируем задачу*/
    event.preventDefault();
    if (!stateInputValue || !statePriority) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }
    if (updateTask) {
      const newTask: AddEditTaskProps = {
        id: updateTask.id,
        title: stateInputValue,
        priority: statePriority as Prioroty,
        status: updateTask.status,
        progress: updateTask.progress,
      };
      editTask(newTask);
    }
    onClose(event);
    setStateInputValue('');
    setStatePriority('');
  };
  const priorities = [
    { value: Prioroty.HIGH, className:styles.high, selected: styles['high-selected']},
    { value: Prioroty.MEDIUM, className: styles.medium, selected: styles['medium-selected'] },
    { value: Prioroty.LOW, className: styles.low, selected: styles['low-selected'] },
  ];

  return (
    <Modal>
      <form>
        <div className={styles['add-edit-modal']}>
          <div className={styles['flx-between']}>
            <span className={styles['modal-title']}>
              {isEditing ? `Редактировать задачу` : `Добавить задачу`}
            </span>
            <CloseButton onClose={onClose} />
          </div>
          <Input
            label="Задача"
            placeholder={
              isEditing
                ? updateTask?.title || 'Введите текст..'
                : 'Введите текст..'
            }
            onChange={handleChange}
            name="title"
            value={stateInputValue}
          />
          <div className={styles['modal-priority']}>
            <span>Приортитет</span>
            <ul className={styles['priority-buttons']}>
              {priorities.map((priority) => (
                <li
                  key={priority.value}
                  onClick={() => {
                    handlePriorityClick(priority.value);
                  }}
                  className={statePriority === priority.value ? priority.selected : priority.className} 
                >
                  {priority.value}
                </li>
              ))}
            </ul>
          </div>
          <div className={`${styles['flx-right']} ${styles['mt-50']}`}>
            <Button
              title={isEditing ? `Редактировать` : `Добавить`}
              type="submit"
              onClick={isEditing ? handleClickEditTask : handleClickAddTask}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

//import classNames from 'classnames';
import DeleteIcon from '../../../../../assets/icons/delete.svg?react';
import EditIcon from '../../../../../assets/icons/edit.svg?react';
import { CircularProgressBar } from './CircularProgressBar/CircularProgressBar';
import styles from './TaskCard.module.scss';
import { MouseEventHandler, useState, useEffect } from 'react';
import { Prioroty, Status } from '../../shared/types';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    priority: Prioroty;
    status: Status;
    progress: number;
  };
  onClick: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
  editStatus: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task: { id, title, priority, status, progress },
  onClick,
  onDelete,
  editStatus,
}) => {
  const [taskStatus, setTaskStatus] = useState(status);
  const [taskProgress, setTaskProgress] = useState(progress);

  useEffect(() => {
    editProgress();
  }, [taskStatus]);

  const editProgress = () => {
    let newProgress = 0;

    if (taskStatus === Status.TODO) {
      newProgress = 0;
    } else if (taskStatus === Status.PROGRESS) {
      newProgress = 50;
    } else if (taskStatus === Status.DONE) {
      newProgress = 100;
    }

    setTaskProgress(newProgress);
    return newProgress;
  };
  const handleEditStatus = () => {
    const newStatus =
      taskStatus === Status.TODO
        ? Status.PROGRESS
        : taskStatus === Status.PROGRESS
        ? Status.DONE
        : Status.TODO;

    setTaskStatus(newStatus);
    editStatus();
    editProgress();
  };
  const prioritiesStyles = (priority:Prioroty) => {
    if (priority === Prioroty.HIGH) {
    return styles['priority--high'];
    } else if (priority === Prioroty.MEDIUM) {
    return styles['priority--middle'];
    } else {
    return styles['priority--low'];
    }
    };

    const showStatusStyle = (status:Status)=>{
if(status===Status.PROGRESS){
  return styles['status--inProgress']
}
else if(status===Status.DONE){
  return styles['status--done']
}
else{
  return styles.status
}
    }

  console.log('Current priority:', priority);
  return (
    <div className={styles['task-card']} key={id}>
      <div className={`${styles.flex} ${styles['w-100']}`}>
        <span className={styles['task-title']}>Задача</span>
        <span className={styles.task}>{title}</span>
      </div>
      <div className={styles.flex}>
        <span className={styles['priority-title']}>Приоритет</span>
        <span
          className={prioritiesStyles(priority)}
        >
          {priority}
        </span>
      </div>
      <div className={styles['task-status-wrapper']}>
        <button
          onClick={handleEditStatus}
          className={`${showStatusStyle(status)} ${styles.status}`}
        >
          {taskStatus.replace('_', ' ')}
        </button>
      </div>
      <div className={styles.progress}>
        <CircularProgressBar
          strokeWidth={2}
          sqSize={24}
          percentage={taskProgress}
        />
      </div>
      <div className={styles.actions}>
        <button
          className={`${styles['mr-20']} ${styles.cp}`}
          onClick={onClick}
          type="button"
        >
          <EditIcon />
        </button>

        <button
          className={styles.cp}
          onClick={onDelete}
          type="button"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

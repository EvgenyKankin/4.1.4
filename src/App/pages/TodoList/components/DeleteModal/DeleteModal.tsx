import { type MouseEventHandler } from 'react';
import { Button } from '../Button/Button';
import { Modal } from '../../shared/Modal/Modal';
import './style.scss';

type DeleteModalProps= {
  onExit: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}
export const DeleteModal: React.FC<DeleteModalProps> = ({onExit,onDelete}) => {
  return (
    <Modal>
      <div className="delete-modal">
        <p>Точно удалить задачу?</p>
        <div className="delete-modal__actions">
          <Button title="Удалить" onClick={onDelete} />
          <Button title="Выйти" outline onClick={onExit} />
        </div>
      </div>
    </Modal>
  );
};

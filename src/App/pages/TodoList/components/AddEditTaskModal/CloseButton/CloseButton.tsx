import Close from '../../../../../../assets/icons/close.svg?react';
import React, { type MouseEventHandler } from 'react';
import styles from './CloseButton.module.scss';

export interface CloseButtonProps {
  onClose: MouseEventHandler<HTMLButtonElement>;
}

export const CloseButton: React.FC<CloseButtonProps> = ({ onClose }) => {
  return (
    <button className={`${styles.cp} ${styles.iconButton}`} onClick={onClose} type="button">
      <Close />
    </button>
  );
};

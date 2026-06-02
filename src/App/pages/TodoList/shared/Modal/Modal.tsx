import styles from "./Modal.module.scss"
 interface ModalProps{
  children :React.ReactNode;
}
export const Modal:React.FC<ModalProps> = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div className={styles["modal-content"]}>{children}</div>
    </div>
  )
}

export default Modal

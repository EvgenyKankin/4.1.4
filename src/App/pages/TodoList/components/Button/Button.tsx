import classnames from "classnames"
import type { MouseEventHandler, ReactNode } from "react"
import styles from "./Button.module.scss"

type ButtonProps = {
  title: string
  icon?: ReactNode
  outline?: boolean
  disabled?: boolean
  onClick: MouseEventHandler<HTMLButtonElement>
  type?: string;
}

export const Button = ({ title, icon, outline, onClick }: ButtonProps) => {
  return (
    <button className={classnames(outline && styles.outline, styles.button) } onClick={onClick} >
      {icon && <span className={styles.icon}>{icon}</span>}
      {title}
    </button>
  )
}

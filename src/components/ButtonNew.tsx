import type { JSX, Component } from "solid-js"
import styles from './ButtonNew.module.css'
import NewDocument from "./icons/NewDocument"

const ButtonNew: Component = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) =>
  <button class={styles.button} classList={{[styles.disabled]: props.disabled}} onClick={props.onClick} disabled={props.disabled}>
    <NewDocument color="var(--text-color)" />
    Novo
  </button>

export default ButtonNew

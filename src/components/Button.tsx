import type { JSX, JSXElement, Component } from "solid-js"
import styles from './Button.module.css'

type ButtonProps = {
  children?: JSXElement,
  bgColor?: string,
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>

const Button: Component = (props: ButtonProps) =>
  <button style={{ 'background-color': props.bgColor }} class={styles.button} classList={{[styles.disabled]: props.disabled}} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>

export default Button

import type { Component, JSX } from "solid-js";
import styles from './TextInput.module.css'

type TextInputProps = {
  value?: string,
  placeholder?: string,
  disabled: boolean,
} & JSX.HTMLAttributes<HTMLInputElement>

const TextInput: Component<TextInputProps> = (props: TextInputProps) =>
  <input type="text" onInput={props.onInput} onChange={props.onChange} placeholder={props.placeholder} class={styles.input} value={props.value} disabled={props.disabled} />

export default TextInput

import { Component } from "solid-js"
import Twitter from "../icons/Twitter"
import styles from './Close.module.css'

type Props = {
  action: () => void,
}

const Close: Component<Props> = (props: Props) => {
  const  { action } = props
  return (
    <div class={styles.close} onClick={() => action()}>
      <Twitter color="var(--bg-color)" />
    </div>
  )
}

export default Close

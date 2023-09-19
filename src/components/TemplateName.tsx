import { Component } from "solid-js"
import styles from './TemplateName.module.css'

type Props = {
  name: string,
}

const TemplateName: Component<Props> = (props: Props) => {
  const { name } = props
  return (
    <div class={styles.name}>{name}</div>
  )
}
export default TemplateName
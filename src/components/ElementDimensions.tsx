import type { Accessor, Component } from "solid-js";
import type { TemplateElement } from '../types/Template'
import styles from './ElementDimensions.module.css'

type ElementDimensionsProps = {
  el: Accessor<TemplateElement>
}

const ElementDimentions: Component<ElementDimensionsProps> = (props: ElementDimensionsProps) => {
  const { el } = props
  return (
    <div class={styles.container}>
      <div>x: {el().x}, y: {el().y}</div>
      <div>({el().width} x {el().height})</div>
    </div>
  )
}

export default ElementDimentions
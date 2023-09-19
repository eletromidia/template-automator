import type { JSX } from 'solid-js/jsx-runtime'
import styles from './TabPill.module.css'
import { JSXElement } from 'solid-js'

type ButtonProps = {
  selected: () => boolean,
  childern?: JSXElement,
} & JSX.HTMLAttributes<HTMLDivElement>

const TabPill = (props: ButtonProps) => {
  const { selected, children } = props
  return (
    <div onClick={props.onClick} classList={{ [styles.selected]: selected(), [styles.tab]: true }}>
      {children}
    </div> 
  )
}
export default TabPill

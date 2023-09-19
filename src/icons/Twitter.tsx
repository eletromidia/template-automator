import type { Component, JSX } from 'solid-js'

type Props = {} & JSX.HTMLAttributes<SVGElement>

const X: Component<Props> = (props: Props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L20 20M20 4L4 20" stroke={props.color || 'var(--text-color)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)

export default X

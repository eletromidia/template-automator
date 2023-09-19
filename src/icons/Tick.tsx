import type { Component, JSX } from 'solid-js'

type TickProps = {} & JSX.HTMLAttributes<SVGElement>

const Tick: Component<TickProps> = (props: TickProps) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke={props.color || 'var(--text-color)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

export default Tick

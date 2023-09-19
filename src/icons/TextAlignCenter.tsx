import type { Component, JSX } from "solid-js";

const TextAlignCenter: Component = (props: JSX.HTMLAttributes<SVGElement>) =>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={props.onClick}>
    <path d="M5 8H19M5 16H19M3 12H21" stroke={props.color || 'var(--text-color)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

export default TextAlignCenter
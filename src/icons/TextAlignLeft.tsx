import type { Component, JSX } from "solid-js";

const TextAlignLeft: Component = (props: JSX.HTMLAttributes<SVGElement>) =>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={props.onClick}>
    <path d="M3 10H16M3 14H21M3 18H16M3 6H21" stroke={props.color || 'var(--text-color)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

export default TextAlignLeft
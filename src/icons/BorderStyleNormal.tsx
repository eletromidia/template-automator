import type { Component, JSX } from "solid-js";

const BorderStyleNormal: Component = (props: JSX.HTMLAttributes<SVGElement>) =>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={props.onClick}>
    <rect x="4" y="4" width="16" height="16" stroke={props.color || 'var(--text-color)'} stroke-width="2" stroke-linecap="round"/>
  </svg>

export default BorderStyleNormal
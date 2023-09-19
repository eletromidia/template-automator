import type { Component, JSX } from "solid-js";

const MediaReplay: Component = (props: JSX.HTMLAttributes<SVGElement>) =>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={props.onClick}>
    <path d="M3 3V8M3 8H8M3 8L6 5.29168C7.59227 3.86656 9.69494 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.71683 21 4.13247 18.008 3.22302 14" stroke={props.color || 'var(--text-color)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

export default MediaReplay
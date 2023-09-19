import type { Component, JSX } from "solid-js";

const VideoOff: Component = (props: JSX.HTMLAttributes<SVGElement>) =>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={props.onClick}>
<path d="M7 6.99992V20M17 4V12H21M17 17V20M3 8H7M17 8H21M3 16H7M3 12H12M4.17649 4.1785C4.14771 4.1908 4.11959 4.20394 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.0799 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.0799 20 6.2 20H17.8C18.8439 20 19.4013 20 19.8186 19.8236M9.60133 4H17.8C18.9201 4 19.4802 4 19.908 4.21799C20.2843 4.40973 20.5903 4.71569 20.782 5.09202C21 5.51984 21 6.07989 21 7.2V15.3898M3 3L21 21" stroke={props.color || 'var(--text-color)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>  </svg>

export default VideoOff
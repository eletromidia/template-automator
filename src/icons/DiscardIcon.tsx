import type { Component, JSX } from "solid-js";

const DiscardIcon: Component = (props: JSX.HTMLAttributes<SVGElement>) =>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={props.onClick}>
    <path d="M19 9L13 3M19 9H16.2C15.0799 9 14.5198 9 14.092 8.78201C13.7157 8.59027 13.4097 8.28431 13.218 7.90798C13 7.48016 13 6.9201 13 5.8V3M19 9V11M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.07989 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.07989 21 8.2 21H11M19.5 20.2361C18.9692 20.7111 18.2684 21 17.5 21C15.8431 21 14.5 19.6569 14.5 18C14.5 16.3431 15.8431 15 17.5 15C18.8062 15 19.9175 15.8348 20.3293 17M21 14.5V17.5H18" stroke={props.color || 'var(--text-color)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>

export default DiscardIcon
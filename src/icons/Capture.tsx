import type { Component, JSX } from "solid-js";

const Capture: Component = (props: JSX.HTMLAttributes<SVGElement>) =>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={props.onClick}>
    <path d="M10.1797 8C9.6274 8 9.17969 8.44772 9.17969 9C9.17969 9.55228 9.6274 10 10.1797 10V8ZM14.4298 3.63683C14.7059 3.15854 14.542 2.54695 14.0637 2.27081C13.5855 1.99467 12.9739 2.15854 12.6977 2.63683L14.4298 3.63683ZM7.58057 11.5C7.30443 11.9783 7.4683 12.5899 7.9466 12.866C8.42489 13.1422 9.03648 12.9783 9.31262 12.5L7.58057 11.5ZM9.31495 15.5C9.59109 15.9783 10.2027 16.1422 10.681 15.866C11.1593 15.5899 11.3231 14.9783 11.047 14.5L9.31495 15.5ZM5.97404 5.71337C5.6979 5.23508 5.08631 5.0712 4.60802 5.34735C4.12973 5.62349 3.96585 6.23508 4.24199 6.71337L5.97404 5.71337ZM16.3126 12.5C16.5888 12.0217 16.4249 11.4101 15.9466 11.134C15.4683 10.8578 14.8567 11.0217 14.5806 11.5L16.3126 12.5ZM9.47273 20.347C9.19659 20.8253 9.36047 21.4369 9.83876 21.7131C10.3171 21.9892 10.9286 21.8253 11.2048 21.347L9.47273 20.347ZM17.9659 18.3595C18.242 18.8377 18.8536 19.0016 19.3319 18.7255C19.8102 18.4493 19.9741 17.8377 19.6979 17.3595L17.9659 18.3595ZM14.5829 8.5C14.3068 8.02171 13.6952 7.85783 13.2169 8.13397C12.7386 8.41012 12.5747 9.02171 12.8509 9.5L14.5829 8.5ZM3.49981 14C2.94753 14 2.49981 14.4477 2.49981 15C2.49981 15.5523 2.94753 16 3.49981 16V14ZM20.4844 8H10.1797V10H20.4844V8ZM12.6977 2.63683L7.58057 11.5L9.31262 12.5L14.4298 3.63683L12.6977 2.63683ZM11.047 14.5L5.97404 5.71337L4.24199 6.71337L9.31495 15.5L11.047 14.5ZM14.5806 11.5L9.47273 20.347L11.2048 21.347L16.3126 12.5L14.5806 11.5ZM19.6979 17.3595L14.5829 8.5L12.8509 9.5L17.9659 18.3595L19.6979 17.3595ZM13.6886 14H3.49981V16H13.6886V14ZM20 12C20 16.4183 16.4183 20 12 20V22C17.5228 22 22 17.5228 22 12H20ZM12 20C7.58172 20 4 16.4183 4 12H2C2 17.5228 6.47715 22 12 22V20ZM4 12C4 7.58172 7.58172 4 12 4V2C6.47715 2 2 6.47715 2 12H4ZM12 4C16.4183 4 20 7.58172 20 12H22C22 6.47715 17.5228 2 12 2V4Z" fill={props.color || 'var(--text-color)'} />
  </svg>

export default Capture
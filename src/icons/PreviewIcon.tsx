import type { Component } from "solid-js"
import type { JSX } from "solid-js/jsx-runtime"

type PreviewIconProps = {} & JSX.HTMLAttributes<SVGElement>

const PreviewIcon: Component<PreviewIconProps> = (props: PreviewIconProps) => {
  const { onClick } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={onClick}>
      <path d="M3 9H9.5M21 9H9.5M9.5 9L14.5 4M14.5 4H17.8C18.8467 4 19.4044 4 19.8221 4.1779M14.5 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.07989 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.88 4.20371 19.8514 4.19037 19.8221 4.1779M9 4L4 9M15 9.00015L19.8221 4.1779M15 14.5L10 17.5V11.5L15 14.5Z" stroke={props.color || 'var(--text-color)'} stroke-width="2" stroke-linejoin="round"/>
    </svg>
  )
}

export default PreviewIcon
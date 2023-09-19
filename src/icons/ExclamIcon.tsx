import type { Component } from "solid-js"
import type { JSX } from "solid-js/jsx-runtime"

type ExclamIconProps = {
  title?: string,
} & JSX.HTMLAttributes<SVGElement>

const ExclamIcon: Component<ExclamIconProps> = (props: ExclamIconProps) => {
  const { title, onClick } = props
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={onClick}>
      <title style={{ display: title ? 'initial' : 'none'}}>{title}</title>
      <path d="M12 17.0001H12.01M12 10.0001V14.0001M6.41209 21.0001H17.588C19.3696 21.0001 20.2604 21.0001 20.783 20.6254C21.2389 20.2985 21.5365 19.7951 21.6033 19.238C21.6798 18.5996 21.2505 17.819 20.3918 16.2579L14.8039 6.09805C13.8897 4.4359 13.4326 3.60482 12.8286 3.32987C12.3022 3.09024 11.6978 3.09024 11.1714 3.32987C10.5674 3.60482 10.1103 4.4359 9.19614 6.09805L3.6082 16.2579C2.74959 17.819 2.32028 18.5996 2.39677 19.238C2.46351 19.7951 2.76116 20.2985 3.21709 20.6254C3.7396 21.0001 4.63043 21.0001 6.41209 21.0001Z" stroke={props.color || 'var(--text-color)'} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  )
}

export default ExclamIcon
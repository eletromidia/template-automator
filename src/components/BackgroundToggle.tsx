import styles from './RadioPicker.module.css'
import VideoOn from "../icons/VideoOn"
import VideoOff from "../icons/VideoOff"
import { Show, type Component } from 'solid-js'
import ImgOn from '../icons/ImgOn'
import ImgOff from '../icons/ImgOff'

type VideoToggleProps = {
  state: () => boolean,
  setState: (value: boolean) => void,
  disabled?: boolean,
  isImg?: boolean,
}


const VideoToggle: Component<VideoToggleProps> = (props: VideoToggleProps) => {
  const { state, setState, disabled, isImg } = props
  const set = (value: boolean) => {
    if (disabled) return
    setState(value)
  }
  return (
    <div style={{ display: 'flex', 'justify-content': 'space-evenly', padding: '2px', 'margin-bottom': '8px' }}>
        <label class={styles.choice}>
          <input disabled={disabled} name="toggleVideo" type="radio" value={'yes'} onInput={(ev) => set(Boolean(ev.target.value))} checked={state()} />
          <Show when={isImg} fallback={<VideoOn color={state() ? undefined : 'var(--bg-color-dark-2)'} />}>
            <ImgOn color={state() ? undefined : 'var(--bg-color-dark-2)'} />
          </Show>
        </label>
        <label class={styles.choice}>
          <input disabled={disabled} name="toggleVideo" type="radio" value={''} onInput={(ev) => set(Boolean(ev.target.value))} checked={!state()} />
          <Show when={isImg} fallback={<VideoOff color={state() ? 'var(--bg-color-dark-2)' : undefined } />}>
            <ImgOff color={state() ? 'var(--bg-color-dark-2)' : undefined } />
          </Show>
        </label>
    </div>
  )  
}

export default VideoToggle

import { Accessor, JSX, Match, Switch } from "solid-js"
import MediaPause from "../icons/MediaPause"
import MediaPlay from "../icons/MediaPlay"
import MediaReplay from "../icons/MediaReplay"

import styles from './MediaControls.module.css'

type MediaControlsProps = {
  progress: Accessor<number>,
  state: Accessor<string>,
  scaleX?: Accessor<number>,
  disabled?: boolean,
} & JSX.HTMLAttributes<HTMLDivElement>

const MediaControls = (props: MediaControlsProps) => {
  const { progress, state, scaleX, disabled, onClick } = props
  const cursorStyle = () => disabled ? 'not-allowed' : 'pointer'
  const color = () => disabled ? 'var(--bg-color-dark-2)' : ''
  return (
    <div class={styles.container} style={{ cursor: cursorStyle() }} onClick={onClick}>
      <Switch>
        <Match when={state() === 'playing'}><MediaPause color={color()}/></Match>
        <Match when={state() === 'paused'}><MediaPlay color={color()}/></Match>
        <Match when={state() === 'end'}><MediaReplay color={color()}/></Match>
      </Switch>
      <div class={styles.bar} style={{ width: `${progress()}%`, scale: `${scaleX()} 1`, 'transform-origin': '0 0' }}></div>
    </div>
  )
}
export default MediaControls


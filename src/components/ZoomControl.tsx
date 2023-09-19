import { Accessor, Component, Setter } from "solid-js"
import styles from './ZoomControl.module.css'

type ZoomControlProps = {
  zoomLevel: Accessor<number>,
  setZoomLevel: Setter<number>,
}

const ZoomControl: Component<ZoomControlProps> = (props: ZoomControlProps) => {

  const { zoomLevel, setZoomLevel } = props
  const onInput = (ev: InputEvent) => {
    const target = ev.target as HTMLInputElement
    const value = parseFloat(target.value)
    if (!isNaN(value)) setZoomLevel(value)
  }
  return (
    <div class={styles.container}>
      <input type="range" class={styles.input} value={zoomLevel()} onInput={onInput} step={0.05} min={0.1} max={2} orient='vertical' />
      <div class={styles.scale}>{zoomLevel().toFixed(2)}</div>
    </div>
  )
}

export default ZoomControl


// Slider vertical em diferentes browsers:

// Firefox: orient="vertical" no elemento input (HTML)
// Edge: writing-mode: bt-lr; (CSS)
// Chrome: -webkit-appearance: slider-vertical; (CSS)

// https://caniuse.com/?search=vertical%20slider
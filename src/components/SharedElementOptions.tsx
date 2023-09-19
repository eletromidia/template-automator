import styles from './SharedElementOptions.module.css'
import type { AnimationType, TemplateElement } from '../types/Template'

type SharedElementOptionsProps = {
  el: () => TemplateElement,
  setAnimation: (type: AnimationType) => void,
  setAnimationStart: (start: string) => void,
}

const SharedElementOptions = (props: SharedElementOptionsProps) => {
  const { el, setAnimation, setAnimationStart } = props
  return (
    <>  
      <div class={styles.elType}>{el().name}</div>
      <div class={styles.animationOptions}>
        <div class={styles.row}>
          <label>animation:</label>
          <select onChange={(ev) => setAnimation(ev.target.value as AnimationType)}>
            <option selected={el().animationName === 'fadeIn'} value="fadeIn">fadeIn</option>
            <option selected={el().animationName === 'slide'} value="slide">slide</option>
          </select>
        </div>
        <div class={styles.row}>
          <div>animation start:</div>
          <div>{el().animationStart}s</div>
        </div>
        <div>
          <input class={styles.animationSlider} onInput={(ev) => setAnimationStart(ev.target.value)} type="range" step={0.5} value={el().animationStart} min={0} max={15} />
        </div>
    </div>
    </>
  )
}

export default SharedElementOptions
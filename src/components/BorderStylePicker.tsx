import type { JSX } from 'solid-js/jsx-runtime'
import styles from './RadioPicker.module.css'
import BorderStyleNormal from '../icons/BorderStyleNormal'
import BorderStyleRounded from '../icons/BorderStyleRounded'

type BorderStylePickerProps= {
  setBorderStyle: (borderStylement: string) => void,
  borderStyle: string,
} & JSX.HTMLAttributes<HTMLDivElement>

const BorderStylePicker = (props: BorderStylePickerProps) => {
  const { borderStyle, setBorderStyle } = props
  return (
    <div class={styles.container}>
      <label>borda:</label>

      <label class={styles.choice} >
        <input class={styles.input} type="radio" name="borderStyle" checked={borderStyle === 'normal' || borderStyle === ''} onInput={() => setBorderStyle('normal')} />
        <div>
          <BorderStyleNormal />
        </div>
      </label> 

      <label class={styles.choice} >
        <input class={styles.input} type="radio" name="borderStyle" checked={borderStyle === 'rounded'} onInput={() => setBorderStyle('rounded')} />
        <div>
          <BorderStyleRounded />
        </div>
      </label>

    </div> 
  )
}
export default BorderStylePicker

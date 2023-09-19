import type { JSX } from 'solid-js/jsx-runtime'
import styles from './RadioPicker.module.css'
import TextAlignLeft from '../icons/TextAlignLeft'
import TextAlignCenter from '../icons/TextAlignCenter'
import TextAlignRight from '../icons/TextAlignRight'
import type { Accessor } from 'solid-js'

type TextAlignPickerProps = {
  setAlign: (alignment: string) => void,
  align: () => string,
} & JSX.HTMLAttributes<HTMLDivElement>

const TextAlignPicker = (props: TextAlignPickerProps) => {
  const { align, setAlign } = props
  return (
    <div class={styles.container}>

      <label class={styles.choice} >
        <input class={styles.input} type="radio" name="align" checked={align() === 'left' || align() === ''} onInput={() => setAlign('left')} />
        <div>
          <TextAlignLeft />
        </div>
      </label> 

      <label class={styles.choice} >
        <input class={styles.input} type="radio" name="align" checked={align() === 'center'} onInput={() => setAlign('center')} />
        <div>
          <TextAlignCenter />
        </div>
      </label> 

      <label class={styles.choice} >
        <input class={styles.input} type="radio" name="align" checked={align() === 'right'} onInput={() => setAlign('right')} />
        <div>
          <TextAlignRight />
        </div>
      </label> 

    </div> 
  )
}
export default TextAlignPicker

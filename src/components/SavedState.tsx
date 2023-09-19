import { Accessor, Component, Show } from 'solid-js'
import FileNotSavedIcon from '../icons/FileNotSavedIcon'
import Button from './Button'
import DiscardIcon from '../icons/DiscardIcon'
import Tick from '../icons/Tick'
import styles from './SavedState.module.css'

type SavedStateProps = {
  unsaved: Accessor<boolean>,
  handleSave: () => void,
  handleDiscard: () => void,
}

const SavedState: Component<SavedStateProps> = (props: SavedStateProps) => {
  const { unsaved, handleSave, handleDiscard } = props
  return (
    <div>
      <div classList={{ [styles.line]: true, [styles.warn]: true }}>
        <div class={styles.button}>
          <Button onClick={() => handleSave()} bgColor='var(--success-color)'>
            <div class={styles.inner}>
              <Tick />
              <div>Finalizar</div>
            </div>
          </Button>
        </div>
        <Show when={unsaved()}>
          <div class={styles.button}>
            <Button onClick={() => handleDiscard()} bgColor='var(--warn-color)'>
              <div class={styles.inner}>
                <DiscardIcon />
                <div>Descartar</div>
              </div>
            </Button>
          </div>
          <div class={styles.warning}>
            <FileNotSavedIcon />
            <div>Alterações não salvas</div>
          </div>
        </Show>
      </div>
    </div>
  )
}

export default SavedState

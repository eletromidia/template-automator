import { Accessor, Component, Show } from "solid-js";
import styles from './ThumbSetter.module.css'
import Button from "./Button";
import Capture from "../icons/Capture";

type ThumbSetterProps = {
  updateThumbnail: () => void,
  thumbnail: Accessor<null | string>,
}

const ThumbSetter: Component<ThumbSetterProps> = (props: ThumbSetterProps) => {
  const { updateThumbnail, thumbnail } = props

  return (
    <div class={styles.container}>
      <div class={styles.buttonWrap}><Button onClick={() => updateThumbnail()}>
        <div class={styles.buttonInner}>
          <Capture />
          <div>Captura</div>
        </div>
        </Button>
      </div>
      <Show when={thumbnail()}>{(thumb) =>
        <img class={styles.thumbnail} src={thumb()} />
      }</Show>
    </div>
  )
}

export default ThumbSetter

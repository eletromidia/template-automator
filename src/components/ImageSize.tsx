import { Component } from 'solid-js'
import styles from './ImageSize.module.css'

type ImageSizeProps = {
  width: () => number,
  height: () => number,
}

const ImageSize: Component<ImageSizeProps> = (props: ImageSizeProps) => {
  const { width, height } = props
  return (
    <div class={styles.imageSize}>{width()} x {height()}</div>
  )
}

export default ImageSize
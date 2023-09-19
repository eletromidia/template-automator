import type { Store } from 'solid-js/store'
import type { TemplateElement, ElementName } from '../types/Template'
import { type Component, For, Ref, createEffect, createSignal, Show, onMount, Accessor, Setter } from 'solid-js'
import { gsap } from 'gsap'
import MediaControls from './MediaControls'
import { getBackground, defaultElementOptionals } from '../utils/template'
import TextInput from './TextInput'
import Button from './Button'
import MediaReplay from '../icons/MediaReplay'
import type { VideoStore } from '../types/Video'
import TabGroup from './TabGroup'
import ThumbSetter from './ThumbSetter'
import TemplateName from './TemplateName'
import ImageSize from './ImageSize'
import { useTemplate } from '../TemplateContext'
import styles from './Previewer.module.css'

type MaybeRef = Ref<HTMLDivElement> | undefined
const MIN_FONT_SIZE = 1
const FONT_RESIZE_STEP = 0.2

type PreviewerProps = {
  name: string,
  videoStore: Store<VideoStore>,
  setTab: Setter<number>,
  tabIndex: Accessor<number>,
  timelineLock: Accessor<boolean>,
  zoomLevel: Accessor<number>,
  setThumbnail: Setter<string>,
  maxDuration: number,
  thumbnail: Accessor<null | string>,
  bgImg: Accessor<string | undefined>,
}

const Previewer:Component<PreviewerProps> = (props: PreviewerProps) => {
  const [ templateConfig, { getElementByName, setTitle, setText }] = useTemplate()
  const { name, timelineLock, videoStore, tabIndex, setTab, zoomLevel, thumbnail, setThumbnail, bgImg, maxDuration } = props
  const refMap: { [key: string]: MaybeRef } = {}
  let videoRef: Ref<HTMLVideoElement> | undefined
  const chosenVideo = () => {
    if (videoStore.active && videoStore.choice) return videoStore.choice
    return false
  }
  const [textResizeDelta, setTextResizeDelta] = createSignal(0)
  const cursor = () => templateConfig.elements.length === 0 ? 'not-allowed' : 'pointer'
  const mainStageStyle = () => {
    return {
      width: `${templateConfig.width}px`,
      height: `${templateConfig.height}px`,
      'background-color': templateConfig.bgColor,
      'background-image': `url('${bgImg()}')`,
      cursor: cursor(),
      border: '1px dotted var(--bg-color-dark-3)',
      'transform-origin': '0 0',
      transform: `scale(${zoomLevel()})`
    }
  }
  const elementStyle = (el: TemplateElement) => {
    const fontSize = Math.max(MIN_FONT_SIZE, (el.fontSize || defaultElementOptionals.fontSize) - textResizeDelta())
    const borderRadius = el.borderStyle === 'rounded' ? '20px' : '0'
    const bg = getBackground(el)
    let z = templateConfig.elements.length
    if (el.name === 'texto') z += 10
    if (el.name === 'titulo') z += 20
    return {
      ...bg,
      position: 'absolute',
      width: `${el.width}px`,
      height: `${el.height}px`,
      'border-radius': borderRadius,
      color: el.color,
      'font-family': el.fontFamily || defaultElementOptionals.fontFamily,
      'font-size': `${fontSize}px`,
      'text-align': el.textAlign || defaultElementOptionals.textAlign,
      overflow: defaultElementOptionals.overflow,
      'z-index': z,
    }
  }
  const [elapsed, setElapsed] = createSignal(0)
  const tl = gsap.timeline({ paused: true })
  const [timelineState, setTimelineState] = createSignal('paused')

  tl.eventCallback('onUpdate', () => {
    setElapsed(tl.time())
    if (tl.time() >= maxDuration) {
      tl.pause()
      setTimelineState('end')
    }
  })

  tl.eventCallback('onComplete', () => {
    setTimelineState('end')
  })

  const progress = () => elapsed() / maxDuration* 100

  const setAnimation = (a: { name: string, start: number, ref: MaybeRef, x: number, y: number }) => {
    if (!a.ref) return
    switch (a.name) {
      case 'slide': {
        tl.fromTo(a.ref,
        { x: 0, y: a.y, opacity: 0, duration: 1 , delay: a.start },
        { x: a.x, y: a.y, opacity: 1, duration: 1, delay: a.start, ease: 'power1.out'},
        0
      )
      break
      }
      case 'fadeIn': {
        tl.fromTo(a.ref, 
        { x: a.x, y: a.y, opacity: 0, delay: a.start, duration: 1 },
        { x: a.x, y: a.y, opacity: 1, delay: a.start,  duration: 1, ease: 'power1.out' },
        0
      )
        break
      }
      default: {}
    }
    tl.to(a.ref, { y: a.y, delay: maxDuration, duration: 0 }, 0)
  }

  const pause = () => {
    tl.pause()
    setTimelineState('paused')
  }

  const rewind = () => {
    tl.seek(0)
    setElapsed(0)
    pause()
    if (chosenVideo() && videoRef) {
      const video = videoRef as HTMLVideoElement
      video.currentTime = 0
    }
  }

  const resume = () => {
    tl.resume()
    setTimelineState('playing')
  }

  let canvasRef: Ref<HTMLCanvasElement> | undefined
  const updateThumbnail = () => {
    if (!videoRef || !canvasRef || !chosenVideo()) return
    const video = videoRef as HTMLVideoElement
    const canvas = canvasRef as HTMLCanvasElement
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const img = canvas.toDataURL('image/png')
    setThumbnail(img)
  }


  const handleClick = () => {
    if (!templateConfig.elements.length) return
    switch (timelineState()) {
      case 'paused': {
        resume()
        break
      }
      case 'playing': {
        pause()
        break
      }
      case 'end': {
        rewind()
        tl.play()
        setTimelineState('playing')
        break
      }
    }
  }
  
  const animations = () => templateConfig.elements.map((el) => {
    return { ref: refMap[el.name], start: el.animationStart, name: el.animationName, x: el.x, y: el.y }
  })
  const canAnimate = () => templateConfig.elements.length && !(animations().map(a => a.ref).includes(undefined))
  const textValue = (name: ElementName) => {
    const attrs = getElementByName(name)
    if (attrs) return attrs.placeholder
    return ''
  }

  createEffect(() => {
    if (canAnimate() && !timelineLock()) {
      rewind()
      tl.clear()
      animations().forEach((a) => {
        setAnimation(a)
      })
    }
  })
  createEffect(() => {
    if (!templateConfig.elements.length) {
      rewind()
    }
  })

  createEffect(() => { // revert auto sizing when the text box is cleared
    const t = getElementByName('texto')
    if (t && t.placeholder?.length === 0) {
      setTextResizeDelta(0)
    }
  })

  createEffect(() => { // keep video in sync with timeline
    if (chosenVideo() && videoRef) {
      const video = videoRef as HTMLVideoElement
      const state = timelineState()
      if (state === 'playing') video.play()
      if (state === 'paused' || state === 'end') video.pause()
    }
  })

  const autoSizeTick = () => {
    const ref = refMap.texto
    if (!ref) return
    const el = ref as HTMLDivElement
    if (el.clientHeight <= 0) return
    if (el.clientHeight >= el.scrollHeight) return
    setTextResizeDelta(textResizeDelta() + FONT_RESIZE_STEP)
  }
  const loop = () => {
    autoSizeTick()
    requestAnimationFrame(loop)
  }

  onMount(() => loop())


  return (
    <div class={styles.wrapper}>
      <div class={styles.aside}>
        <TemplateName name={name} />
        <TabGroup selected={tabIndex} setSelected={setTab} />
        <div style={{ display: 'flex', 'align-items': 'center', 'justify-content': 'space-between', 'font-size': '12px' }}>
          <div class={styles.elapsed}>{elapsed().toFixed(2)} / {maxDuration.toFixed(2)}</div>
          <Button disabled={elapsed() === 0} onClick={() => rewind()}>
            <div style={{ display: 'flex', 'align-items': 'center', gap: '8px', height: '18px' }}>
              <MediaReplay color={elapsed() === 0 ? 'var(--bg-color-dark-2)' : 'var(--text-color)'} /><span>Restart</span>
            </div>
          </Button>
        </div>
        <Show when={setTitle && getElementByName('titulo')}>
          <div>
            <div>Titulo</div>
            <TextInput value={textValue('titulo') || ''} onInput={(ev) => setTitle!(ev.target.value)} />
          </div>
        </Show>
        <Show when={setText && getElementByName('texto')}>
          <div>
            <div>Texto</div>
            <TextInput value={textValue('texto') || ''} onInput={(ev) => setText!(ev.target.value)} />
          </div>
        </Show>
        <Show when={chosenVideo()}>
          <ThumbSetter updateThumbnail={updateThumbnail} thumbnail={thumbnail} />
        </Show>
      </div>
      <div>
        <MediaControls state={timelineState} progress={progress} onClick={handleClick} disabled={templateConfig.elements.length === 0} scaleX={zoomLevel} />
        <div class={styles.stage} style={mainStageStyle()} onClick={handleClick}>
        <canvas ref={canvasRef} style={{display: 'none', position: 'relative'}}></canvas>
          <Show when={chosenVideo()}>{(choice) =>
            <video ref={videoRef} class={styles.video} src={choice()} muted={true} controls={false}></video>
          }</Show>
          <For each={templateConfig.elements}>{el =>
            <div ref={refMap[el.name]} style={elementStyle(el)}>{textValue(el.name)}
              <Show when={el.name === 'imagem'}>
                <ImageSize width={() => el.width} height={() => el.height} />
              </Show>
            </div>
          }</For>
        </div>
      </div>
    </div>
  )
}

export default Previewer
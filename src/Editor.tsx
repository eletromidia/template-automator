import { Accessor, Component, For, Setter, Show, createEffect, createSignal, onCleanup, onMount } from 'solid-js'
import { SetStoreFunction, Store, createStore } from 'solid-js/store'
import invertColor from './utils/invert'
import type { TemplateElement, ElementName } from './types/Template'
import { getBackground, defaultElementOptionals } from './utils/template'
import BorderStylePicker from './components/BorderStylePicker'
import TextOptions from './components/TextOptions'
import SharedElementOptions from './components/SharedElementOptions'
import ElementDimentions from './components/ElementDimensions'
import type { VideoStore } from './types/Video'
import VideoLoader from './components/VideoLoader'
import BackgroundToggle from './components/BackgroundToggle'
import Width from './icons/Width'
import Height from './icons/Height'
import type { TemplatePermissions } from './types/TemplatePermissions'
import TabGroup from './components/TabGroup'
import TemplateName from './components/TemplateName'
import { useTemplate } from './TemplateContext'
import ImageSize from './components/ImageSize'
import styles from './Editor.module.css'

const MODKEY = 'Shift'
const VIDEO_FORMATS = ['video/mp4', 'video/webm', 'video/ogv', ]
const IMG_FORMATS = ['image/jpeg', 'image/png', 'image/tiff', ]

type EditorProps = {
  name: string,
  videoStore: Store<VideoStore>,
  setVideoStore: SetStoreFunction<VideoStore>,
  permissions: TemplatePermissions,
  setTab: Setter<number>,
  tabIndex: Accessor<number>,
  zoomLevel: Accessor<number>,
  bgType: string,
  loadWithBackground?: string,
  thumbnail?: Accessor<null | string>,
  bgImg: Accessor<undefined | string>,
  setBgImg: Setter<undefined | string>,
}

const Editor: Component<EditorProps> = (props: EditorProps) => {

  const [templateConfig,
    {
      getElementById,
      setWidth,
      setHeight,
      setBgColor,
      setBorderStyle,
      setAnimation,
      setAnimationStart,
      addTitleElement,
      addTextElement,
      addImageElement,
      removeTitleElement,
      removeTextElement,
      removeImageElement,
      setTextAlign,
      setFontFamily,
      setFontColor,
      setFontSize,
      setPositionX,
      setPositionY,
      setPlaceholder,
      moveElementX,
      moveElementY,
      changeElementHeight,
      changeElementWidth,
      containElementPosition,
      containElementSize,
  }] = useTemplate()

  let container: HTMLDivElement | undefined
  let bgCanvas: HTMLCanvasElement | undefined
  let fgCanvas: HTMLCanvasElement | undefined
  const { name, videoStore, setVideoStore, permissions, loadWithBackground, tabIndex, setTab, zoomLevel, thumbnail, bgImg, setBgImg, bgType } = props
  const [modKey, setModKey] = createSignal(false)
  const [gridSize, setGridSize] = createSignal(20)
  const [showBorders, setShowBorders] = createSignal(true)
  const [mouseX, setMouseX] = createSignal(0)
  const [mouseY, setMouseY] = createSignal(0)
  const [dragStore, setDragStore] = createStore({
    target: '',
    offsetX: 0,
    offsetY: 0,
  })
  const [selection, setSelection] = createSignal('')
  const [resizeStore, setResizeStore] = createStore({ direction: '', start: 0 })

  const selectedElement = () => templateConfig.elements.find((el) => el.id === selection())
  const videoState = () => videoStore.active
  const setVideoState = (value: boolean) => {
    if (!permissions.addVideo) return
    setVideoStore('active', value)
  }

  let loadWithVideo = undefined
  let isImg = IMG_FORMATS.includes(bgType)
  let isVideo = VIDEO_FORMATS.includes(bgType)
  if (loadWithBackground) {
    if (isImg) {
      setBgImg(loadWithBackground)
      isImg = true
      setVideoState(true)
    }
    if (isVideo) {
      loadWithVideo = loadWithBackground
      setVideoState(true)
    }
    if (!isImg && !isVideo) {
      throw new Error("Formato de imagem ou video inválido")
    }
  }
  
  const reverseColor = () => invertColor(templateConfig.bgColor)
  const borderColor = () => showBorders() ? reverseColor() : 'transparent'
  const getElementAtPosition = (x: number, y: number) => {
    if (!container) return
    const rect = container.getBoundingClientRect() || { top: 0, left: 0 }
    const scaleX = (x - rect.left) / zoomLevel()
    const scaleY = (y - rect.top) / zoomLevel()
    for (const el of templateConfig.elements) {
      const betweenX = scaleX > el.x && scaleX <= el.x + el.width
      const betweenY = scaleY > el.y && scaleY <= el.y + el.height
      if (betweenX && betweenY) {
        return el.id
      }
    }
  }

  const mainStageStyle = () => {
    const _image = thumbnail() || bgImg()
    const image = videoState() ? `url('${_image}')` : undefined
    return {
      width: `${templateConfig.width}px`,
      height:`${templateConfig.height}px`,
      'background-color': templateConfig.bgColor,
      'background-image': image,
      transform: `scale(${zoomLevel()})`,
    }
  }
  const getStyle = (el: TemplateElement) => {
    const bg = getBackground(el)
    const borderRadius = el.borderStyle === 'rounded' ? 20 : 0
    const cursor = dragStore.target === el.id ? 'grabbing' : 'grab'
    let z = templateConfig.elements.length
    if (el.name === 'texto') z += 10
    if (el.name === 'titulo') z += 20
    return {
      ...bg,
      'background-size': 'cover',
      cursor,
      border: `2px solid ${borderColor()}`,
      width: `${el.width}px`,
      height: `${el.height}px`,
      position: 'absolute',
      "transform":` translate(${el.x}px, ${el.y}px)`,
      "font-family":` ${el.fontFamily || defaultElementOptionals.fontFamily}`,
      "font-size":` ${el.fontSize || defaultElementOptionals.fontSize}px`,
      "overflow": defaultElementOptionals.overflow,
      "color":` ${el.color || defaultElementOptionals.color}`,
      "text-align":` ${el.textAlign || defaultElementOptionals.textAlign}`,
      "border-radius":` ${borderRadius}px`,
      "z-index":` ${z}`,
    }
  }
  const resizerStyle = (orientation: string) => {
    const el = selectedElement()
    if (!el) return
    let x = 0
    let y = 0
    let cursor = ''
    switch (orientation) {
      case 'top': {
        x = el.x + (el.width /2)
        y = el.y
        cursor = 'row-resize'
        break
      }
      case 'left': {
        x = el.x
        y = el.y + (el.height/2)
        cursor = 'col-resize'
        break
      }
      case 'bottom': {
        x = el.x + (el.width /2)
        y = el.y + el.height
        cursor = 'row-resize'
        break
      }
      case 'right': {
        x = el.x + el.width
        y = el.y + (el.height/2)
        cursor = 'col-resize'
        break
      }
    }
    return `
      position: absolute;
      cursor: ${cursor};
      transform: translate(${x-6}px, ${y-6}px);
      transform-origin: center;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${reverseColor()};
      z-index: 100;
      `
  }
  const resizeBoxStyle = () => {
    const el = selectedElement()
    if (!el) return
    const defaultStyle = 'position: absolute; display: none;'
    if (!el || !resizeStore.direction.length) return defaultStyle
    switch (resizeStore.direction) {
      case 'top': {
        const offset = mouseY() - resizeStore.start
        if (offset > 0) {
          return `z-index: 99; opacity: 50%; border: 3px solid ${reverseColor()}; position: absolute; transform: translate(${el.x}px, ${el.y}px); width: ${el.width}px; height: ${offset}px; background-color: ${reverseColor()}`
        } else {
          return `z-index: 99; opacity: 50%; border: 3px solid ${reverseColor()}; position: absolute; transform: translate(${el.x}px, ${el.y + offset}px); width: ${el.width}px; height: ${-offset}px; background-color: ${reverseColor()}`
        }
      }
      case 'left': {
        const offset = mouseX() - resizeStore.start
        if (offset > 0) {
          return `z-index: 99; opacity: 50%; border: 3px solid ${reverseColor()}; position: absolute; transform: translate(${el.x}px, ${el.y}px); width: ${offset}px; height: ${el.height}px; background-color: ${reverseColor()}`
        } else {
          return `z-index: 99; opacity: 50%; border: 3px solid ${reverseColor()}; position: absolute; transform: translate(${el.x + offset}px, ${el.y}px); width: ${-offset}px; height: ${el.height}px; background-color: ${reverseColor()}`
        }
      }
      case 'bottom': {
        const offset = mouseY() - resizeStore.start
        if (offset > 0) {
          return `z-index: 99; opacity: 50%; border: 3px solid ${reverseColor()}; position: absolute; transform: translate(${el.x}px, ${el.y + el.height}px); width: ${el.width}px; height: ${offset}px; background-color: ${reverseColor()}`
        } else {
          return `z-index: 99; opacity: 50%; border: 3px solid ${reverseColor()}; position: absolute; transform: translate(${el.x}px, ${el.y + el.height + offset}px); width: ${el.width}px; height: ${-offset}px; background-color: ${reverseColor()}`
        }
      }
      case 'right': {
        const offset = mouseX() - resizeStore.start
        if (offset > 0) {
          return `z-index: 99; opacity: 50%; border: 3px solid ${reverseColor()}; position: absolute; transform: translate(${el.x + el.width}px, ${el.y}px); width: ${offset}px; height: ${el.height}px; background-color: ${reverseColor()}`
        } else {
          return `z-index: 99; opacity: 50%; border: 3px solid ${reverseColor()}; position: absolute; transform: translate(${el.x + el.width + offset}px, ${el.y}px); width: ${-offset}px; height: ${el.height}px; background-color: ${reverseColor()}`
        }
      }
      default: return defaultStyle
    }
  }
  const hasElementType = (typeName: ElementName) => {
    return Boolean(templateConfig.elements.find((el) => el.name === typeName))
  }
  const handleTitleToggle = (ev: InputEvent) => {
    if (!permissions.addTitle) return
    const target = ev.target as HTMLInputElement
    if (target.checked) addTitleElement(gridSize(), reverseColor())
    else removeTitleElement()
  }
  const handleTextToggle = (ev: InputEvent) => {
    if (!permissions.addText) return
    const target = ev.target as HTMLInputElement
    if (target.checked) addTextElement(gridSize(), reverseColor())
    else removeTextElement()
  }
  const handleImageToggle = (ev: InputEvent) => {
    if (!permissions.addImage) return
    const target = ev.target as HTMLInputElement
    if (target.checked) addImageElement(gridSize(), reverseColor())
    else removeImageElement()
  }
  const resizeElement = (targetX: number, targetY: number) => {
    if (!container) return
    if (!selection()) return
    const snap = modKey() ? gridSize() : 1
    switch (resizeStore.direction) {
      case 'top': {
        const delta = Math.max(container.offsetTop, targetY) - resizeStore.start
        moveElementY(selection(), delta, snap)
        changeElementHeight(selection(), -delta, snap)
        break
      }
      case 'left': {
        const delta = Math.max(container.offsetLeft, targetX) - resizeStore.start
        moveElementX(selection(), delta, snap)
        changeElementWidth(selection(), -delta, snap)
        break
      }
      case 'bottom': {
        const delta = targetY - resizeStore.start
        changeElementHeight(selection(), delta, snap)
        break
      }
      case 'right': {
        const delta = targetX - resizeStore.start
        changeElementWidth(selection(), delta, snap)
        break
      }
    }
    containElementSize(selection())
    setResizeStore({ direction: '', start: 0 })
  }
  const isInsideContainer = (x: number, y: number) => {
    if (!container) return false
    const bounds = container.getBoundingClientRect()
    if (!(bounds.width && bounds.height)) return false
    return (
      x > bounds.left &&
      x < bounds.right &&
      y > bounds.top &&
      y < bounds.bottom
    )
  }
  const showTip = () => !thumbnail() && videoStore.videos.length && videoState()
  const handleMouseMove = (ev: MouseEvent) => {
    const snap = modKey() ? gridSize() : 1
    setMouseX(ev.clientX)
    setMouseY(ev.clientY)
    if (!dragStore.target.length) return
    setSelection(dragStore.target)
    setPositionX(dragStore.target, ev.clientX - dragStore.offsetX, snap)
    setPositionY(dragStore.target, ev.clientY - dragStore.offsetY, snap)
  }
  const handleMouseUp = (ev: MouseEvent) => {
    if (!container) return
    containElementPosition(dragStore.target)
    setDragStore('target', '')
    resizeElement(ev.clientX, ev.clientY)
    if (!isInsideContainer(ev.clientX, ev.clientY)) {
      return
    }
    ev.preventDefault()
  }
  const handleMouseDown = (ev: MouseEvent, elId: string) => {
    const element = templateConfig.elements.find((el) => el.id === elId)
    if (!element) return
    ev.preventDefault()
    setDragStore('target', elId)
    setDragStore('offsetX', ev.clientX - element.x)
    setDragStore('offsetY', ev.clientY - element.y)
  }
  const handleClick = (ev: MouseEvent) => {
    if (!container) return
    if (!isInsideContainer(ev.clientX, ev.clientY)) {
      return
    }
    ev.preventDefault()
    ev.stopPropagation()
    const target = getElementAtPosition(ev.clientX, ev.clientY) || ''
    setSelection(target)
  }
  const handleWheel = (ev: WheelEvent) => {
    if (ev.deltaY === 0) return
    const delta = ev.deltaY > 0 ? 1 : -1
    const newGridSize = Math.max(gridSize() + delta, 8)
    setGridSize(newGridSize)
  }
  const handleKeyDown = (ev: KeyboardEvent) => {
    switch (ev.key) {
      case MODKEY: {
        setModKey(true)
        break
      }
      case 'Escape': {
        if (dragStore.target.length) containElementPosition(dragStore.target)
        setDragStore('target', '')
        if (resizeStore.direction) resizeElement(mouseX(), mouseY())
        setSelection('')
        break
      }
      case 'ArrowUp': {
        ev.preventDefault()
        moveElementY(selection(), -1)
        containElementPosition(selection())
        setDragStore('target', '')
        break
      }
      case 'ArrowDown': {
        ev.preventDefault()
        moveElementY(selection(), 1)
        containElementPosition(selection())
        setDragStore('target', '')
        break
      }
      case 'ArrowLeft': {
        ev.preventDefault()
        moveElementX(selection(), -1)
        containElementPosition(selection())
        setDragStore('target', '')
        break
      }
      case 'ArrowRight': {
        ev.preventDefault()
        moveElementX(selection(), 1)
        containElementPosition(selection())
        setDragStore('target', '')
        break
      }
    }
  }
  const handleKeyUp = (ev: KeyboardEvent) => {
    switch (ev.key) {
      case MODKEY: {
        setModKey(false)
        break
      }
    }    
  }
  const clickResizer = (ev: MouseEvent, direction: string) => {
    ev.preventDefault()
    const vertical = ['top', 'bottom',]
    const horizontal = ['right', 'left']
    if (![...vertical, ...horizontal].includes(direction)) return
    const start = vertical.includes(direction) ? ev.clientY : ev.clientX
    setResizeStore({ direction, start })
  }

  const bgCanvasStyle = () => {
    const visibility = modKey() ? 'visible' : 'hidden'
    return { position: 'absolute', 'transform-origin': '0 0', visibility }
  }
  const fgCanvasStyle = () => {
    return { position: 'absolute', 'transform-origin': '0 0', 'pointer-events': 'none', background: 'transparent', 'z-index': 9000 }
  }
  const clearFgCanvas = () => {
    if (!fgCanvas) return
    const ctx = fgCanvas.getContext('2d')
    if (!ctx) return
    ctx.beginPath()
    ctx.clearRect(0, 0, fgCanvas.width, fgCanvas.height)
    ctx.closePath()
  }
  const drawVertical = () => {
    if (!fgCanvas) return
    const ctx = fgCanvas.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = reverseColor()
    ctx.beginPath()
    ctx.moveTo(fgCanvas.width/2, 0)
    ctx.lineTo(fgCanvas.width/2, fgCanvas.height)
    ctx.stroke()
    ctx.closePath()
  }
  const drawHorizontal = () => {
    if (!fgCanvas) return
    const ctx = fgCanvas.getContext('2d')
    if (!ctx) return
    ctx.strokeStyle = reverseColor()
    ctx.beginPath()
    ctx.moveTo(0, fgCanvas.height/2)
    ctx.lineTo(fgCanvas.width, fgCanvas.height/2)
    ctx.stroke()
    ctx.closePath()
  }
  const drawGrid = () => {
    if (!bgCanvas) return
    const ctx = bgCanvas.getContext('2d')
    if (!ctx) return
    ctx.setLineDash([1, 2])  // higher cost for redraws
    ctx.beginPath()
    ctx.clearRect(0, 0, templateConfig.width, templateConfig.height)
    ctx.closePath()
    if (gridSize() <= 2) {
      return
    }
    ctx.lineWidth = 1
    ctx.strokeStyle = reverseColor()
    const size = gridSize()
    let x = 0
    while (x < templateConfig.width) {
      ctx.moveTo(x, 0)
      ctx.lineTo(x, templateConfig.height)
      ctx.stroke()
      x += size
    }
    let y = 0
    while (y < templateConfig.height) {
      ctx.moveTo(0, y)
      ctx.lineTo(templateConfig.width, y)
      ctx.stroke()
      y += size
    }
  }

  onMount(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('click', handleClick)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
  })
  onCleanup(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    window.removeEventListener('click', handleClick)
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
  })

  createEffect(() => {
    drawGrid()
  })

  createEffect(() => {
    // Removing the entire listener when modKey is not pressed improves performance
    // mouse wheel lags otherwise
    if (modKey()) window.addEventListener('wheel', handleWheel)
    else window.removeEventListener('wheel', handleWheel)
  })

  createEffect(() => {
    clearFgCanvas()
    if (!dragStore.target && !selection()) return
    const target = getElementById(dragStore.target) || selectedElement()
    if (!target) return
    const middleX = Math.round(target.x + (target.width / 2))
    const middleY = Math.round(target.y + (target.height / 2))
    if (middleX === Math.round(templateConfig.width / 2)) drawVertical()
    if (middleY === Math.round(templateConfig.height/ 2)) drawHorizontal()
  })

  return (
    <div class={styles.container}>
      <div class={styles.sidebar}>
        <TemplateName name={name} />
        <TabGroup selected={tabIndex} setSelected={setTab} />
        <div class={styles.templateGlobals}>
          <BackgroundToggle state={videoState} setState={setVideoState} disabled={!permissions.addVideo} isImg={isImg} />
          <Show when={!isImg && videoState()}>
            <VideoLoader videoStore={videoStore} setVideoStore={setVideoStore} loadWithVideo={loadWithVideo} disabled={!permissions.editVideoSrc} />
          </Show>
          <div class={styles.tip} style={{ display: showTip() ? 'block' : 'none' }}>
            <strong>Nenhuma captura disponível.</strong>
            <div>Você pode usar um quadro do video como referência na edição.</div>
            <div>Na aba <strong>VER</strong>, clique no botão de <strong>Capatura</strong> e retorne para esta aba</div>
          </div>
          <div class={styles.formRow}>
            <input class={styles.bgColor} type="color" onInput={(ev) => setBgColor(ev.target.value)} value={templateConfig.bgColor}/>
            <div style={{display: 'flex', height:'22px'}}>
              <Width />
              <input disabled={!permissions.editSize} class={styles.inputSize} type="number" onChange={(ev) => {setWidth(parseInt(ev.target.value))}} value={templateConfig.width} />
            </div>
            <div style={{display: 'flex', height:'22px'}}>
              <Height />
              <input disabled={!permissions.editSize} class={styles.inputSize} type="number" onChange={(ev) => {setHeight(parseInt(ev.target.value))}} value={templateConfig.height} />
            </div>
          </div>
          <div class={styles.toolbox}>
            <div class={styles.formRow}><label>titulo</label><input disabled={!permissions.addTitle} type="checkbox" checked={hasElementType('titulo')} onInput={handleTitleToggle}/></div>
            <div class={styles.formRow}><label>texto</label><input disabled={!permissions.addText} type="checkbox" checked={hasElementType('texto')} onInput={handleTextToggle}/></div>
            <div class={styles.formRow}><label>imagem</label><input disabled={!permissions.addImage} type="checkbox" checked={hasElementType('imagem')} onInput={handleImageToggle}/></div>
          </div>
          <div class={styles.borderConfig}>
            <input type="checkbox" checked={showBorders()} onChange={(ev) => setShowBorders(ev.target.checked)} />
            <label>exibir bordas</label>
          </div>
        </div>
        <div class={styles.elementOptions}>
          <Show when={selectedElement()}>{(el) =>
            <>
            <SharedElementOptions el={el} setAnimation={(args) => setAnimation(selection(), args)} setAnimationStart={(args) => setAnimationStart(selection(), args)} />
            <ElementDimentions el={el} />
            <Show when={el().name === 'imagem'}>
              <BorderStylePicker borderStyle={el().borderStyle || ''} setBorderStyle={(value: string) => setBorderStyle(selection(), value)} />
            </Show>
            <Show when={el().name === 'texto' || el().name === 'titulo'}>
              <TextOptions el={el} setFontFamily={(args) => setFontFamily(selection(), args)} setFontSize={(args) => setFontSize(selection(), args)} setTextAlign={(args) => setTextAlign(selection(), args)} setFontColor={(args) => setFontColor(selection(), args)} setPlaceholder={(args) => setPlaceholder(selection(), args)} />
            </Show>
            </>}
          </Show>
        </div>
      </div>
      <div>
        <div class={styles.stageTop} style={{ visibility: modKey() ? 'visible' : 'hidden'}}>grade: {gridSize()}px</div>
        <div ref={container} class={styles.stage} style={mainStageStyle()}>
          <canvas ref={bgCanvas} style={bgCanvasStyle()} width={templateConfig.width} height={templateConfig.height}></canvas>
          <For each = {templateConfig.elements}>{ (el) =>
            <div id={el.id} style={getStyle(el)} onMouseDown={(ev) => handleMouseDown(ev, el.id)}>{el.placeholder || ''}
              <Show when={el.name === 'imagem'}>
                <ImageSize width={() => el.width} height={() => el.height} />
              </Show>
            </div>
          }</For>
          <Show when={selection() !== ''}>
            <div style={resizerStyle('top')} onMouseDown={(ev) => clickResizer(ev, 'top')}></div>
            <div style={resizerStyle('left')} onMouseDown={(ev) => clickResizer(ev, 'left')}></div>
            <div style={resizerStyle('bottom')} onMouseDown={(ev) => clickResizer(ev, 'bottom')}></div>
            <div style={resizerStyle('right')} onMouseDown={(ev) => clickResizer(ev, 'right')}></div>
          </Show>
          <div style={resizeBoxStyle()}></div>
          <canvas ref={fgCanvas} style={fgCanvasStyle()} width={templateConfig.width} height={templateConfig.height}></canvas>
        </div>
      </div>
    </div>
  )
}

export default Editor

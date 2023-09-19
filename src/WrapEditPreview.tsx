import type WrapperProps from './types/WrapEditPreviewProps'
import type { VideoStore } from './types/Video'
import type { TemplateConfig } from './types/Template'
import { createEffect, createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { deserializeTemplate, serializeTemplate } from './utils/serde'
import Editor from './Editor'
import Previewer from './components/Previewer' 
import SavedState from './components/SavedState'
import ZoomControl from './components/ZoomControl'
import styles from './WrapEditPreview.module.css'
import { useTemplate } from './TemplateContext'

const WrapEditPreview = (props: WrapperProps) => {
  const { permissions, error, video, name, duration, bgType } = props
  
  if (error) throw error
  const [templateConfig, { setTemplateConfig }] = useTemplate()
  const [savedState, setSavedState] = createSignal(serializeTemplate(templateConfig))
  const [videoStore, setVideoStore] = createStore<VideoStore>({ videos: [], choice: null, active: false })
  const [timelineLock, setTimelineLock] = createSignal(false)
  const [tabIndex, setTabIndex] = createSignal(0)
  const [zoomLevel, setZoomLevel] = createSignal(1.0)
  const [bgImg, setBgImg] = createSignal<string | undefined>(undefined)
  const [thumbnail, setThumbnail] = createSignal<string | null>(null)
  const unsavedChanges = () => savedState() !== serializeTemplate(templateConfig)

  const save = () => {
    const config = serializeTemplate(templateConfig)
    const message = { eventName: 'json_parameters', json_parameters: config }
    window.parent.postMessage(message, '*')
    setSavedState(config)
    window.parent.postMessage({ eventName: 'close' }, '*')
  }

  const rollback = () => {
    const previous: TemplateConfig = deserializeTemplate(savedState())
    setTemplateConfig(previous)
  }

  createEffect(() => {
    // only rebuild timeline when preview tab is open
    if (tabIndex() === 1) setTimelineLock(false)
    else setTimelineLock(true)
  })

  const displayTab = (n: number) => tabIndex() === n ? 'block' : 'none'

  return (
    <div class={styles.outer}>
      <SavedState unsaved={unsavedChanges} handleDiscard={rollback} handleSave={() => save()} />
      <ZoomControl zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
      <div class={styles.container}>
          <div style={{display: displayTab(0)}}>
            <Editor
              name={name}
              videoStore={videoStore}
              setVideoStore={setVideoStore}
              tabIndex={tabIndex} setTab={setTabIndex}
              loadWithBackground={video}
              permissions={permissions}
              zoomLevel={zoomLevel}
              thumbnail={thumbnail}
              bgImg={bgImg}
              setBgImg={setBgImg}
              bgType={bgType}
            />
          </div>
          <div style={{display: displayTab(1)}}>
            <Previewer
              name={name}
              timelineLock={timelineLock}
              tabIndex={tabIndex}
              setTab={setTabIndex}
              videoStore={videoStore}
              zoomLevel={zoomLevel}
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              bgImg={bgImg}
              maxDuration={duration}
            />
          </div>
      </div>
    </div>
  )
}

export default WrapEditPreview

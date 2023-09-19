import { For, type Component, createSignal, Show, onMount, createEffect } from "solid-js"
import type { SetStoreFunction, Store } from "solid-js/store"
import Button from "./Button"
import Spinner from "./Spinner"
import UploadIcon from "../icons/UploadIcon"
import InternetIcon from "../icons/InternetIcon"
import ChevronLeft from "../icons/ChevronLeft"
import VideoPlus from "../icons/VideoPlus"
import ExclamIcon from '../icons/ExclamIcon'
import type { VideoStore } from '../types/Video'
import { pickerOpts } from '../utils/video'
import styles from './VideoLoader.module.css'

type VideoLoaderProps = {
  videoStore: Store<VideoStore>,
  setVideoStore: SetStoreFunction<VideoStore>,
  loadWithVideo?: string,
  disabled?: boolean,
}

const VideoLoader: Component<VideoLoaderProps> = (props: VideoLoaderProps) => {
  const { videoStore, setVideoStore, loadWithVideo, disabled } = props
  const [loading, setLoading] = createSignal(false)
  const [errorMsg, setErrorMsg] = createSignal<string | null>(null)
  const videoChoice = () => videoStore.choice
  const setVideoChoice = (value: string) => setVideoStore('choice', value)
  const getRecordByName = (name: string) => videoStore.videos.find((r) => r.name === name)
  const getRecordByUrl = (url: string) => videoStore.videos.find((r) => r.url?.toString() === url)
  const [showInputUrl, setShowInputUrl] = createSignal(false)
  const [urlInput, setUrlInput] = createSignal('')

  const validUrl = () => {
    try {
      return new URL(urlInput())
    } catch {
      return null
    }
  }

  const loadFile = async () => {
    if (disabled) return
    setErrorMsg(null)
    try {
      const [file] = await window.showOpenFilePicker(pickerOpts) as FileSystemFileHandle[]
      const cached = getRecordByName(file.name)
      if (cached) {
        setShowInputUrl(false)
        setVideoChoice(cached.objectUrl)
        return cached
      }
      const blob = await file.getFile()
      const objectUrl = URL.createObjectURL(blob)
      const entry = { blob, objectUrl, name: file.name }
      setVideoStore('videos', videoStore.videos.length, entry)
      setVideoChoice(entry.objectUrl)
      return entry
    } catch (err) {
      setErrorMsg(`${err}`)
    }
  }

  const loadUrl = async () => {
    const url = validUrl()
    if (!url) return
    setErrorMsg(null)
    try {
      const cached = getRecordByUrl(url.toString())
      if (cached) {
        setVideoChoice(cached.objectUrl)
        setLoading(false)
        return
      }
      setLoading(true)
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`video request failed with status code ${response.status}`)
      }
      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const name = url.href.split('/').pop()
      const entry = { blob, objectUrl, url, name }
      setVideoStore('videos', videoStore.videos.length, entry)
      setVideoChoice(entry.objectUrl)
      setLoading(false)
      setShowInputUrl(false)
    } catch (err) {
      setLoading(false)
      setErrorMsg(`${err}`)
    }
  }

  const clickLoad = () => {
    if (disabled) return
    loadUrl()
  }
  const clickInternetUpload = () => {
    if (disabled) return
    setShowInputUrl(true)
  }
  onMount(() => {
    if (loadWithVideo) {
      const alreadyLoaded = getRecordByUrl(loadWithVideo)
      if (alreadyLoaded) return
      setUrlInput(loadWithVideo)
      loadUrl()
    }
  })

  createEffect(() => {
    if (videoStore.videos.length === 0) {
      if (disabled && !loading()) setShowInputUrl(false)
      if (loading()) setShowInputUrl(true)
    }
  })

  const iconColor = () => disabled ? 'var(--bg-color-dark-2)' : undefined
  const containerDisplay = () => disabled && !loading() ? 'none' : 'block'

  return (
    <div class={styles.container} style={{display: containerDisplay()}}>
      <div style={{display: 'flex', width: '100%', }} class={styles.row}>
        <Show when={!showInputUrl() && videoStore.videos.length}>
          <select disabled={disabled} class={styles.select} onChange={(ev) => setVideoChoice(ev.target.value)}>
            <For each={videoStore.videos}>{(record) =>
              <option selected={videoChoice() === record.objectUrl} value={record.objectUrl}>{record.name}</option>
            }</For>
          </select>
        </Show>
        <div class={styles.row} style={{display: showInputUrl() ? 'flex' : 'none', width: '100%'}}>
          <Show when={loading()}><div style={{ 'margin-right': '8px' }}><Spinner /></div></Show>
          <Show when={errorMsg()}>{(msg) =>
            <div style={{padding: '0 4px', height: '20px'}}><ExclamIcon color="var(--danger-color)" title={msg()} /></div>
          }</Show>
          <input class={styles.input} disabled={loading()} value={urlInput()} onInput={(ev) => setUrlInput(ev.target.value)} placeholder="http://video.mp4" />
          <Button disabled={!validUrl() || loading()} onClick={() => clickLoad()}>
            <VideoPlus color={!validUrl() || loading() ? 'var(--bg-color-dark-2)': undefined} />
          </Button>
          <Button onClick={() => setShowInputUrl(false)} disabled={disabled}>
            <ChevronLeft color={iconColor()} />
          </Button>
        </div>
        <div class={styles.row} style={{display: showInputUrl() ? 'none' : 'flex', width: showInputUrl() ? '100%' : 'fit-content', 'margin-bottom': '4px'}}>
          <Button onClick={() => loadFile()} disabled={disabled}>
            <UploadIcon color={iconColor()} />
          </Button>
          <Button onClick={() => clickInternetUpload()} disabled={disabled}>
            <InternetIcon color={iconColor()} />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default VideoLoader

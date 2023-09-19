import VideoLoader from "./VideoLoader"
import { Show, } from "solid-js"
import { createStore } from "solid-js/store"
import type { VideoStore } from "../types/Video"

const VideoStoreWrapper = () => {
  const [videoStore, setVideoStore] = createStore<VideoStore>({ videos: [], choice: null, active: false })
  return (
    <>
      <VideoLoader videoStore={videoStore} setVideoStore={setVideoStore} />
      <Show when={videoChoice()}>{(choice) =>
        <video src={choice()} controls={true} muted={true} autoplay={true} />
      }</Show>
    </>
  )
}

export default VideoStoreWrapper


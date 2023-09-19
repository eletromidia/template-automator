export type VideoRecord = {
  name: string,
  blob: Blob,
  objectUrl: string,
  url?: URL,
}

export type VideoStore = {
  videos: VideoRecord[]
  choice: string | null,
  active: boolean,
}


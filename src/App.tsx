import { Component, ErrorBoundary } from "solid-js";
import WrapEditPreview from "./WrapEditPreview";
import ErrorEditPreview from "./components/ErrorEditPreview";
import { deserializeTemplate } from "./utils/serde";
import { TemplateConfig  } from "./types/Template";
import { TemplateSchema } from "./types/Datastore";
import { defaultConfig } from "./utils/template";
import { TemplateProvider } from "./TemplateContext";

const readQueryString = () => {
  let error: Error | undefined = undefined
  let config: TemplateConfig | undefined = undefined
  let video = undefined
  let name = ''
  let duration = 15
  let bgType = ''
  console.log(window.location.search)
  const query = new URLSearchParams(window.location.search)
  try {
    const params = query.get('json_parameters')
    bgType = query.get('bgType') || ''
    if (!params || !params.length) throw new Error('json_parameters query string is missing or empty')
    const template = TemplateSchema.parse(JSON.parse(params))
    let width = undefined
    let height = undefined
    const w = parseInt(query.get('width'))
    if (!isNaN(w)) width = w
    const h = parseInt(query.get('height'))
    if (!isNaN(h)) height = h
    config = template.json_config_modelo_predefinido.length ? deserializeTemplate(template.json_config_modelo_predefinido) : defaultConfig(template, width || 800, height || 860)
    name = template.nome || ''
    video = template.url_background
    duration = template.duracao_padrao
  } catch (e) {
    error = e
  }
  return {
    name,
    config: {
      width: 800,
      height: 600,
      elements: [],
      bgColor: '#FFFFFF',
      ...config,
    },
    permissions: {
      addTitle: false,
      addText: false,
      addImage: false,
      addVideo: Boolean(video),
      editVideoSrc: false,
      editSize: false
    },
    duration,
    error,
    video,
    bgType,
  }
}

const App: Component = () => {
  const { config, permissions, error, video, name, duration, bgType } = readQueryString()

  const sendCloseMessage = () => {
    const msg = { eventName: 'close' }
    window.parent.postMessage(msg, '*')
  }

  return (
    <ErrorBoundary fallback={ error => <ErrorEditPreview error={error} dismiss={sendCloseMessage} /> }>
      <TemplateProvider template={config}>
        <WrapEditPreview
          permissions={permissions}
          error={error}
          video={video}
          name={name}
          duration={duration}
          bgType={bgType}
        />
      </TemplateProvider>
    </ErrorBoundary>
  )
}


export default App
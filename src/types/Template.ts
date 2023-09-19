export type { TemplateConfig, TemplateElement, AnimationType, ElementName }

type ElementName = 'titulo' | 'texto' | 'imagem'
type AnimationType = 'fadeIn' | 'slide'

type TemplateElement = {
  id: string,
  name: ElementName,
  x: number,
  y: number,
  width: number,
  height: number,
  animationName: AnimationType,
  animationStart: number,
  color: string,
  fontFamily?: string,
  fontSize?: number,
  textAlign?: string,
  placeholder?: string,
  borderStyle?: string,
}

type TemplateConfig = {
  width: number,
  height: number,
  elements: TemplateElement[],
  bgColor: string,
}

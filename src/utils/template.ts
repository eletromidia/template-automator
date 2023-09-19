import { Template } from '../types/Datastore'
import type { TemplateConfig, TemplateElement } from '../types/Template'
import { randomImage } from './random'

export const defaultElementOptionals = {
  color: '#303030',
  fontFamily: 'sans-serif',
  fontSize: 16,
  textAlign: 'left',
  placeholder: '',
  borderStyle: 'normal',
  overflow: 'hidden',
}

export const defaultConfig = (template: Template, width: number, height: number) => {
  const gridSize = 20
  const elements: TemplateElement[] = []
  const config: TemplateConfig = {
    width,
    height,
    bgColor: '#FEFEFE',
    elements,
  }
  if (template.suporta_titulo) {
    const el: TemplateElement = { ...defaultElementOptionals, name: 'titulo', x: gridSize, y: gridSize, width: config.width - gridSize*2, height: gridSize*2, id: 'title', textAlign: 'center', fontSize: 24, animationName: 'fadeIn', animationStart: 1, color: '#303030' }
    config.elements.push(el)
  }
  if (template.suporta_texto) {
    const el: TemplateElement = { ...defaultElementOptionals, name: 'texto', x: gridSize, y: config.height - gridSize*4, width: config.width - gridSize*2, height: gridSize*3, id: 'text', animationName: 'fadeIn', animationStart: 1, color: '#303030' }
    config.elements.push(el)
  }
  if (template.suporta_imagem) {
    const el: TemplateElement = { ...defaultElementOptionals, name: 'imagem', x: gridSize, y: gridSize*4, width: config.width - gridSize*2, height: config.height - gridSize*9, id: 'img', animationName: 'slide', animationStart: 2, color: '#303030' }
    config.elements.push(el)
  }
  return config
}


export function getBackground(el: TemplateElement, fallbackColor: string = 'transparent') {
  const bg = el.name === 'imagem'
    ? randomImage
    : { 'background-color': fallbackColor }
  return bg
}

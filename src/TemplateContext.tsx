import { createContext, useContext, JSXElement } from 'solid-js'
import { SetStoreFunction, Store, createStore } from 'solid-js/store'
import type { AnimationType, ElementName, TemplateConfig, TemplateElement } from  './types/Template'
import { defaultElementOptionals } from './utils/template'

type TemplateSetters = {
  readonly getElementByName: (name: ElementName) => TemplateElement
  readonly setWidth: (value: number) => void,
  readonly setHeight: (value: number) => void,
  readonly setBgColor: (color: string) => void,
  readonly addTitleElement: (gridSize: number, color: string) => void,
  readonly addTextElement: (gridSize: number, color: string) => void,
  readonly addImageElement: (gridSize: number, color: string) => void,
  readonly removeTitleElement: () => void,
  readonly removeTextElement: () => void,
  readonly removeImageElement: () => void,
  readonly setAnimation: (id: string, name: AnimationType) => void,
  readonly setAnimationStart: (id: string, start: string | number) => void,
  readonly setFontFamily: (id: string, fontFamily: string) => void,
  readonly setFontColor: (id: string, fontColor: string) => void,
  readonly setFontSize: (id: string, size: string | number) => void,
  readonly setTextAlign: (id: string, align: string) => void,
  readonly setPlaceholder: (id: string, placeholder: string) => void,
  readonly setTitle: (text: string) => void,
  readonly setText: (text: string) => void,
  readonly setBorderStyle: (id: string, border: string) => void,
  readonly setPositionX: (id: string, pos: number, snap?: number) => void,
  readonly setPositionY: (id: string, pos: number, snap?: number) => void,
  readonly moveElementX: (id: string, delta: number | string, snap?: number) => void,
  readonly moveElementY: (id: string, delta: number | string, snap?: number) => void,
  readonly changeElementWidth: (id: string, delta: number | string, snap?: number) => void,
  readonly changeElementHeight: (id: string, delta: number | string, snap?: number) => void,
  readonly setElementWidth: (id: string, size: number) => void,
  readonly setElementHeight: (id: string, size: number) => void,
  readonly setTemplateConfig: SetStoreFunction<TemplateConfig>,
  readonly containElementPosition: (id: string) => void,
  readonly containElementSize: (id: string) => void,
}

const TemplateContext = createContext<[Store<TemplateConfig>, TemplateSetters] | undefined>()

export const TemplateProvider = (props: { children?: JSXElement, template: TemplateConfig }) => {
  const [templateConfig, setTemplateConfig] = createStore<TemplateConfig>(props.template)

  const snapTo = (n: number, cellSize: number) => {
    return Math.round(n / cellSize) * cellSize
  }

  const getElementById = (id: string) => templateConfig.elements.find((el) => el.id === id)
  const getElementByName = (name: ElementName) => templateConfig.elements.find((el) => el.name === name)

  const setPositionX = (id: string, pos: number, snap=1) => {
    const exists = getElementById(id)
    if (!exists) return
    setTemplateConfig('elements', e => e.id === id, 'x', snapTo(pos, snap))
  }
  const setPositionY = (id: string, pos: number, snap=1) => {
    const exists = getElementById(id)
    if (!exists) return
    setTemplateConfig('elements', e => e.id === id, 'y', snapTo(pos, snap))
  }
  const setElementWidth = (id: string, size: number) => {
    const exists = getElementById(id)
    if (!exists) return
    setTemplateConfig('elements', e => e.id === id, 'width', size)
  }
  const setElementHeight = (id: string, size: number) => {
    const exists = getElementById(id)
    if (!exists) return
    setTemplateConfig('elements', e => e.id === id, 'height', size)
  }
  const containElementPosition = (id: string) => {
    // Keep element in bounds
    const el = getElementById(id)
    if (!el) return
    if (el.x < 0) setPositionX(id, 0)
    if (el.y < 0) setPositionY(id, 0)
    if (el.x + el.width > templateConfig.width) setPositionX(id, templateConfig.width - el.width)
    if (el.y + el.height > templateConfig.height) setPositionY(id, templateConfig.height - el.height)
  }
  const containElementSize = (id: string) => {
    const el = getElementById(id)
    if (!el) return
    const maxW = templateConfig.width - el.x
    const maxH = templateConfig.height - el.y
    if (el.width > maxW) setElementWidth(id, maxW)
    if (el.height > maxH) setElementHeight(id, maxH)
  }

  const value = [templateConfig, {
    getElementByName,
    setWidth(value: number) {
      setTemplateConfig('width', value)
    },
    setHeight(value: number) {
      setTemplateConfig('height', value)
    },
    setBgColor(color: string) {
      setTemplateConfig('bgColor', color)
    },
    addTitleElement(gridSize: number, color: string) {
      const exists = getElementByName('titulo')
      if (exists) return
      const el: TemplateElement = { ...defaultElementOptionals, name: 'titulo', x: gridSize, y: gridSize, width: templateConfig.width - gridSize*2, height: gridSize*2, id: 'title', textAlign: 'center', fontSize: 24, animationName: 'fadeIn', animationStart: 1, color: color }
      setTemplateConfig('elements', templateConfig.elements.length, el)
    },
    addTextElement(gridSize: number, color: string) {
      const exists = getElementByName('texto')
      if (exists) return
      const el: TemplateElement = { ...defaultElementOptionals, name: 'texto', x: gridSize, y: templateConfig.height - gridSize*4, width: templateConfig.width - gridSize*2, height: gridSize*3, id: 'text', animationName: 'fadeIn', animationStart: 1, color: color }
      setTemplateConfig('elements', templateConfig.elements.length, el)
    },
    addImageElement(gridSize: number, color: string) {
      const exists = getElementByName('imagem')
      if (exists) return
      const el: TemplateElement = { ...defaultElementOptionals, name: 'imagem', x: gridSize, y: gridSize*4, width: templateConfig.width - gridSize*2, height: templateConfig.height - gridSize*9, id: 'img', animationName: 'fadeIn', animationStart: 1, color: color }
      setTemplateConfig('elements', templateConfig.elements.length, el)
    },
    removeTitleElement() {
      const exists = getElementByName('titulo')
      if (!exists) return
      const elements = templateConfig.elements.filter((e) => e.name !== 'titulo')
      setTemplateConfig('elements', elements)
    },
    removeTextElement() {
      const exists = getElementByName('texto')
      if (!exists) return
      const elements = templateConfig.elements.filter((e) => e.name !== 'texto')
      setTemplateConfig('elements', elements)
    },
    removeImageElement() {
      const exists = getElementByName('imagem')
      if (!exists) return
      const elements = templateConfig.elements.filter((e) => e.name !== 'imagem')
      setTemplateConfig('elements', elements)
    },
    setAnimation(id: string, name: AnimationType) {
      const exists = getElementById(id)
      if (!exists) return
      setTemplateConfig('elements', e => e.id === id, 'animationName', name)
    },
    setAnimationStart(id: string, start: string | number) {
      const exists = getElementById(id)
      if (!exists) return
      const value = typeof(start) === 'string' ? parseFloat(start) : start
      if (isNaN(value)) return
      setTemplateConfig('elements', e => e.id === id, 'animationStart', value)
    },
    setFontFamily(id: string, fontFamily: string) {
      const exists = getElementById(id)
      if (!exists) return
      setTemplateConfig('elements', e => e.id === id, 'fontFamily', fontFamily)
    },
    setFontColor(id: string, fontColor: string) {
      const exists = getElementById(id)
      if (!exists) return
      setTemplateConfig('elements', e => e.id === id, 'color', fontColor)
    },
    setFontSize(id: string, size: string | number) {
      const exists = getElementById(id)
      if (!exists) return
      const value = typeof(size) === 'string' ? parseInt(size, 10) : size
      setTemplateConfig('elements', e => e.id === id, 'fontSize', value)
    },
    setTextAlign(id: string, align: string) {
      const exists = getElementById(id)
      if (!exists) return
      setTemplateConfig('elements', e => e.id === id, 'textAlign', align)
    },
    setPlaceholder(id: string, placeholder: string) {
      const exists = getElementById(id)
      if (!exists) return
      setTemplateConfig('elements', e => e.id === id, 'placeholder', placeholder)
    },
    setTitle(text: string) {
      setTemplateConfig('elements', e => e.name === 'titulo', 'placeholder', text)
    },
    setText(text: string) {
      setTemplateConfig('elements', e => e.name === 'texto', 'placeholder', text)
    },
    setBorderStyle(id: string, border: string) {
      const exists = getElementById(id)
      if (!exists) return
      setTemplateConfig('elements', e => e.id === id, 'borderStyle', border)
    },
    setPositionX,
    setPositionY,
    moveElementX(id: string, delta: number | string, snap=1) {
      const exists = getElementById(id)
      if (!exists) return
      const value = typeof(delta) === 'string' ? parseInt(delta, 10) : delta
      setTemplateConfig('elements', e => e.id === id, 'x', x => snapTo(x + value, snap))
    },
    moveElementY(id: string, delta: number | string, snap=1) {
      const exists = getElementById(id)
      if (!exists) return
      const value = typeof(delta) === 'string' ? parseInt(delta, 10) : delta
      setTemplateConfig('elements', e => e.id === id, 'y', y => snapTo(y + value, snap))
    },
    changeElementWidth(id: string, delta: number | string, snap=1) {
      const exists = getElementById(id)
      if (!exists) return
      let value = typeof(delta) === 'string' ? parseInt(delta, 10) : delta
      if (isNaN(value)) return
      setTemplateConfig('elements', e => e.id === id, 'width', w => snapTo(w + value, snap))
    },
    changeElementHeight(id: string, delta: number | string, snap=1) {
      const exists = getElementById(id)
      if (!exists) return
      let value = typeof(delta) === 'string' ? parseInt(delta, 10) : delta
      if (isNaN(value)) return
      setTemplateConfig('elements', e => e.id === id, 'height', h => snapTo(h + value, snap))
    },
    containElementPosition,
    containElementSize,
    setTemplateConfig,
  }] as const

  return (
    <TemplateContext.Provider value={value as [Store<TemplateConfig>, TemplateSetters]}>
      {props.children}
    </TemplateContext.Provider>
  )
}


export const useTemplate = () => { return useContext(TemplateContext) }



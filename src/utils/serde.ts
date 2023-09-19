import type { AnimationType, ElementName, TemplateElement, TemplateConfig } from "../types/Template"
import { type TemplateJsonConfig, TemplateConfigDb, TemplateElementDbSchema, type TemplateElementDb } from "../types/Datastore" 
import cssTime from 'css-time'

export function deserializeTemplate(config: string | object) {
  const dbConfig: TemplateJsonConfig = typeof config === 'string' ? TemplateConfigDb.parse(JSON.parse(config)) : TemplateConfigDb.parse(config)
  const { width, height, elements, bgColor } = dbConfig
  const template: TemplateConfig = {
    width,
    height,
    elements: [],
    bgColor: bgColor || '#000000'
  }
  if (isNaN(template.width) || isNaN(template.height)) return null
  const rawElements = elements.map(el => validateElement(el))
  const converted = rawElements.map(deserializeElement)
  if (converted.includes(null)) return null
  template.elements = converted as TemplateElement[]
  return template
}

export function serializeTemplate (template: TemplateConfig) {
  try {
    const elements = template.elements.map(toLegacy)
    return JSON.stringify({
      id: '',
      name: '',
      width: template.width,
      height: template.height,
      bgColor: template.bgColor,
      elements,
    }, (_, v) => v ?? undefined) // omit null values
  } catch (err) {
    throw new Error(`template serialization failed for: ${template}`, {cause: err})
  }
}

const convertType = (elName: ElementName) => {
  if (['texto', 'titulo'].includes(elName)) return 'text'
  if (elName === 'imagem') return 'image'
  return ''
}

const toLegacy = (el: TemplateElement) => {
  const start = `${el.animationStart*1000}ms`
  return {
    type: convertType(el.name),
    alias: el.name.toLocaleUpperCase(),
    properties: {
      pos_x: `${el.x}`,
      pos_y: `${el.y}`,
      width: `${el.width}`,
      height: `${el.height}`,
      color: el.color || null,
      font: el.fontFamily || null,
      font_size: el.fontSize || null,
      align: el.textAlign || null,
      border: el.borderStyle || null,
    },
    transition: {
      type: el.animationName,
      start,
    },
  } as TemplateElementDb
}

const validateElement = (o: any) => {
  try {
    const valid = TemplateElementDbSchema.parse(o)
    return valid
  } catch (err) {
    console.warn(err)
    return null
  }
}

const deserializeElement = (el: TemplateElementDb | null) => {
  if (!el) return null
  const x = parseInt(el.properties.pos_x, 10)
  const y = parseInt(el.properties.pos_y, 10)
  const width = parseInt(el.properties.width, 10)
  const height = parseInt(el.properties.height, 10)
  const animationStart = cssTime.from(el.transition.start) / 1000
  const textOptions = {
    fontSize: el.properties.font_size,
    textAlign: el.properties.align,
    fontFamily: el.properties.font,
  }
  const imgOptions = {
    borderStyle: el.properties.border
  }
  const converted: TemplateElement = {
    width, height, x, y,
    id: el.alias.toLocaleLowerCase(),
    name: el.alias.toLocaleLowerCase() as ElementName,
    animationName: el.transition.type as AnimationType,
    animationStart,
    color: el.properties.color || '#303030'
  }
  if (el.type === 'image') return {...converted, ...imgOptions} as TemplateElement
  if (el.type === 'text') return {...converted, ...textOptions} as TemplateElement
  return converted
}

import { z } from 'zod'

export const TemplateElementDbPropsSchema = z.object({
  pos_x: z.string(),
  pos_y: z.string(),
  width: z.string(),
  height: z.string(),
  color: z.string().nullable().optional(),
  font: z.string().nullable().optional(),
  font_size: z.number().nullable().optional(),
  align: z.string().nullable().optional(),
  border: z.string().nullable().optional(),
})

export const TemplateElementDbTransitionSchema = z.object({
  start: z.string(),
  type: z.string(),
})

export const TemplateElementDbSchema = z.object({
  type: z.string(),
  alias: z.string(),
  properties: TemplateElementDbPropsSchema,
  transition: TemplateElementDbTransitionSchema,
})

export const TemplateConfigDb = z.object({
  id: z.string(),
  name: z.string(),
  width: z.number(),
  height: z.number(),
  bgColor: z.string().optional(),
  elements: TemplateElementDbSchema.array(),
})

export const TemplateSchema = z.object({
  nome: z.string(),
  url_background: z.string().optional(),
  suporta_titulo: z.boolean(),
  suporta_texto: z.boolean(),
  suporta_imagem: z.boolean(),
  json_config_modelo_predefinido: z.string(),
  duracao_padrao: z.number(),
})

export type TemplateJsonConfig = z.infer<typeof TemplateConfigDb>  
export type TemplateElementDb = z.infer<typeof TemplateElementDbSchema>
export type TemplateElementPropsDb = z.infer<typeof TemplateElementDbPropsSchema>
export type TemplateElementTransitionDb = z.infer<typeof TemplateElementDbTransitionSchema>
export type Template = z.infer<typeof TemplateSchema>

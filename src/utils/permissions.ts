import type { Template } from '../types/Datastore'
import type { TemplatePermissions} from '../types/TemplatePermissions'

export function getPermissions(template: Template) {
  const perms: TemplatePermissions = {
      addTitle: template.suporta_titulo,
      addText: template.suporta_texto,
      addImage: template.suporta_imagem,
      addVideo: false,
      editVideoSrc: false,
      editSize: false
  }
  return perms
}

export function defaultPermissions() {
  const permissions: TemplatePermissions = {
      addTitle: true,
      addText: true,
      addImage: true,
      addVideo: true,
      editVideoSrc: true,
      editSize: true,
  }
  return permissions
}


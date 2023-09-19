import type { TemplatePermissions } from './TemplatePermissions'

type WrapperProps = {
  permissions: TemplatePermissions,
  duration: number,
  bgType: string,
  error?: Error,
  video?: string,
  name?: string,
}

export default WrapperProps
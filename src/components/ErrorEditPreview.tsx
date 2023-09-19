import { createSignal, type Component } from 'solid-js'
import styles from './Error.module.css'
import ExclamIcon from '../icons/ExclamIcon'
import Button from './Button'

type ErrorComponentProps = {
  error: Error,
  dismiss?: () => void,
}

const ErrorEditPreview: Component<ErrorComponentProps> = (props: ErrorComponentProps) => {
  const { error, dismiss } = props
  const [showDetails, setShowDetails] = createSignal(false)
  const detailDisplay = () => showDetails() ? 'visible' : 'hidden'
  const detailButtonText = () => showDetails() ? 'ocultar detalhes' : 'mostrar detalhes'
  return (
    <div class={styles.container}>
      <div class={styles.heading}>
        <ExclamIcon />
        <div>Erro no editor</div>
      </div>
      <div class={styles.actions}>
        <Button onClick={() => dismiss()} >fechar</Button>
        <Button onClick={() => setShowDetails(!showDetails())} >{detailButtonText()}</Button>
      </div>
      <pre style={{visibility: detailDisplay()}} class={styles.message}>{error.stack || `${error.name}: ${error.message}`}</pre>
    </div>
  )  
}

export default ErrorEditPreview

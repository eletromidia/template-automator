import type { TemplateElement } from '../types/Template'
import TextAlignPicker from './TextAlignPicker'
import TextInput from './TextInput'
import TextIcon from '../icons/TextIcon'
import { defaultElementOptionals } from '../utils/template'
import type { Accessor, Component } from 'solid-js'
import styles from './TextOptions.module.css'

type TextOptionsProps = {
  el: Accessor<TemplateElement>,
  setFontFamily: (family: string) => void,
  setFontSize: (size: string) => void,
  setTextAlign: (align: string) => void,
  setPlaceholder: (text: string) => void,
  setFontColor: (color: string) => void,
}

const TextOptions: Component<TextOptionsProps> = (props: TextOptionsProps) => {
  const { el, setFontFamily, setFontSize, setTextAlign, setFontColor, setPlaceholder } = props
  const alignment = () => el().textAlign || 'left'
  return (
    <div class={styles.container}>
      <div class={styles.row}>
        <label style={{height: '28px'}}><TextIcon /></label>
        <select class={styles.fontSelect} onChange={(ev) => setFontFamily(ev.target.value)}>
          <option value={defaultElementOptionals.fontFamily}>{defaultElementOptionals.fontFamily}</option>
          <option selected={el().fontFamily === 'montserratLight'} value="montserratLight">Montserrat Light</option>
          <option selected={el().fontFamily === 'montserratRegular'} value="montserratRegular">Montserrat Regular</option>
          <option selected={el().fontFamily === 'montserratBold'} value="montserratBold">Montserrat Bold</option>
          <option selected={el().fontFamily === 'arial'} value="arial">Arial</option>
          <option selected={el().fontFamily === 'arialBlack'} value="arialBlack">Arial Black</option>
          <option selected={el().fontFamily === 'gotham,'} value="gotham">Gotham</option>
          <option selected={el().fontFamily === 'gothamBlack'} value="gothamBlack">Gothan Black</option>
          <option selected={el().fontFamily === 'Verdana'} value="Verdana">Verdana</option>
          <option selected={el().fontFamily === 'verdanaBold'} value="verdanaBold">Verdana Bold</option>
        </select>
        <input class={styles.fontSize} type="number" min="1" max="255" onInput={(ev) => setFontSize(ev.target.value)} value={el().fontSize || defaultElementOptionals.fontSize}/>
      </div>
      <TextAlignPicker align={alignment} setAlign={(align: string) => setTextAlign(align)} />
      <div class={styles.row}>
        <TextInput onInput={(ev) => setPlaceholder(ev.target.value)} value={el().placeholder || defaultElementOptionals.placeholder} placeholder="Digite algo aqui"/>
        <input class={styles.textColor} type="color" onInput={(ev) => setFontColor(ev.target.value)} value={el().color || defaultElementOptionals.color}/>
      </div>
    </div>
  )
}

export default TextOptions
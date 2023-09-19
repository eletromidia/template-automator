import { Accessor, Component, Setter } from "solid-js";
import TabPill from "./TabPill";
import styles from './TabGroup.module.css'
import EditIcon from "../icons/EditIcon";
import PreviewIcon from "../icons/PreviewIcon";

type TabGroupProps = {
  selected: Accessor<number>,
  setSelected: Setter<number>,
}
const TabGroup: Component<TabGroupProps> = (props: TabGroupProps) => {
  const { selected, setSelected } = props
  const iconColor = (n: number) => n === selected() ? 'var(--bg-color-dark-1)' : 'var(--text-color)'
  const tabClick = (n: number) => setSelected(n)
  return (
    <div class={styles.container}>
      <TabPill selected={() => selected() === 0} onClick={() => tabClick(0)}>
        <div style={{display: 'flex', height: '28px', 'align-items': 'center', gap: '4px' }}>
          <EditIcon color={iconColor(0)} />
          <div>Editar</div>
        </div>
      </TabPill>
      <TabPill selected={() => selected() === 1} onClick={() => tabClick(1)}>
        <div style={{display: 'flex', height: '28px', 'align-items': 'center', gap: '4px' }}>
          <PreviewIcon color={iconColor(1)} />
          <div>Ver</div>
        </div>
      </TabPill>
    </div>
  )
}

export default TabGroup

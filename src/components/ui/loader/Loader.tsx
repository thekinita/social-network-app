import styles from './Loader.module.scss'
import { Loader2 } from 'lucide-react'

export default function Loader() {
  return <Loader2 className={styles.loader} />
}
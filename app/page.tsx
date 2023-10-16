import Image from 'next/image'
import styles from './page.module.css'
import Prompt  from '../components/prompt'
import Vector from '../components/vector'
export default function Home() {
  return (
    <main className={styles.main}>
     

     
         <Vector />
      
    </main>
  )
}

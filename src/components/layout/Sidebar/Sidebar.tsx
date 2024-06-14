'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sun } from "lucide-react"
import cn from 'clsx'

import styles from "./Sidebar.module.scss"
import { MENU } from "./sidebar.data"

const isLoggedIn = true

export function Sidebar() { 
  
  const pathname = usePathname()

  if(!isLoggedIn) return null

  return (
    <aside className={styles.sidebar}>
      <Link href='/'>
        <Image src='/logo.svg' priority alt="" width={45} height={45}/>
      </Link>
      <div>
        {MENU.map(item => (
          <Link 
            href={item.url} 
            key={item.url} 
            className={
              cn({
                [styles.active]: pathname === item.url
              })
            }>
            <item.icon size={35} />
          </Link>
        ))}
      </div>
      <Sun size={25} />
    </aside>
  )
}
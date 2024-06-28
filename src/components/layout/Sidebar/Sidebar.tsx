'use client'

import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"
import { Sun } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import cn from 'clsx'

import styles from "./Sidebar.module.scss"
import { MENU } from "./sidebar.data"

export function Sidebar() { 
  
  const pathname = usePathname(),
        isLoggedIn = useAuth()

  return (
    <aside className={styles.sidebar}>
      {isLoggedIn.isLoggedIn ? 
      <>
        <Image src='/logo.svg' priority alt="" width={40} height={40}/>
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
              <item.icon size={30} />
            </Link>
          ))}
        </div>
        <Sun size={25} className="cursor-pointer" />
      </>
      : null}
    </aside>
  )
}
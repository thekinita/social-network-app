'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from '@/providers/AuthProvider'
import { SessionProvider } from "next-auth/react"
import { PropsWithChildren } from "react"

const queryClient = new QueryClient

export default function MainProvider({ children }: PropsWithChildren<unknown>) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
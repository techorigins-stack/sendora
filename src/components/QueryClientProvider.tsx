'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function SendoraQueryClientProvider({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

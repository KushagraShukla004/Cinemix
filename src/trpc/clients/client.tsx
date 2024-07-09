'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTRPCReact } from '@trpc/react-query'
import { httpBatchLink } from '@trpc/client'
import { AppRouter } from '../server/routers'
import { getUrl } from './shared'

export const trpcClient = createTRPCReact<AppRouter>()
export function TRPCReactProvider(props: { children: React.ReactNode }) {
  //this is react query client
  const [queryClient] = useState(() => new QueryClient())

  //this is trpc client
  const [trpc] = useState(() =>
    trpcClient.createClient({
      links: [
        httpBatchLink({
          url: getUrl(),
        }),
      ],
    }),
  )

  //   tanstack provider wraps around trpc with which we get loading states
  return (
    <QueryClientProvider client={queryClient}>
      <trpcClient.Provider client={trpc} queryClient={queryClient}>
        {props.children}
      </trpcClient.Provider>
    </QueryClientProvider>
  )
}

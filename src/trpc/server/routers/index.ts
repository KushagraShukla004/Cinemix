import { createTRPCRouter, publicProcedure } from '@/trpc/server'

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(({ ctx }) => {
    return { title: 'News', content: 'Lorem ipsum' }
  }),
})

export type AppRouter = typeof appRouter

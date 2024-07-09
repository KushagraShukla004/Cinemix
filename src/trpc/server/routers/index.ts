import { createTRPCRouter, publicProcedure } from '@/trpc/server'

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(({ ctx }) => {
    return { name: 'Kushagra', age: 23 }
  }),
})

export type AppRouter = typeof appRouter

import { createTRPCRouter, protectedProcedure } from '@/trpc/server'

export const appRouter = createTRPCRouter({
  hello: protectedProcedure('admin' || 'manager').query(({ ctx }) => {
    return { name: 'Kushagra', age: 23 }
  }),
})

export type AppRouter = typeof appRouter

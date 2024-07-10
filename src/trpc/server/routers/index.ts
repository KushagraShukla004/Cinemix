import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/trpc/server'
import { moviesRouter } from './movies'

export const appRouter = createTRPCRouter({
  movies: moviesRouter,
})

export type AppRouter = typeof appRouter

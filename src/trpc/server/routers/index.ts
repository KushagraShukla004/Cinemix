import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/trpc/server'
import { moviesRouter } from './movies'
import { adminsRouter } from './admins'

export const appRouter = createTRPCRouter({
  movies: moviesRouter,
  admins: adminsRouter,
})

export type AppRouter = typeof appRouter

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/trpc/server'
import { moviesRouter } from './movies'
import { adminsRouter } from './admins'
import { cinemasRoutes } from './cinemas'

export const appRouter = createTRPCRouter({
  movies: moviesRouter,
  admins: adminsRouter,
  cinemas: cinemasRoutes,
})

export type AppRouter = typeof appRouter

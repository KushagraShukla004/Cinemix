import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/trpc/server'
import { moviesRouter } from './movies'
import { adminsRouter } from './admins'
import { cinemasRoutes } from './cinemas'
import { managersRoutes } from './managers'

export const appRouter = createTRPCRouter({
  movies: moviesRouter,
  admins: adminsRouter,
  cinemas: cinemasRoutes,
  managers: managersRoutes,
})

export type AppRouter = typeof appRouter

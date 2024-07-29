import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@/trpc/server'
import { moviesRouter } from './movies'
import { adminsRouter } from './admins'
import { cinemasRoutes } from './cinemas'
import { managersRoutes } from './managers'
import { showtimesRoutes } from './showtimes'

export const appRouter = createTRPCRouter({
  movies: moviesRouter,
  admins: adminsRouter,
  cinemas: cinemasRoutes,
  managers: managersRoutes,
  showtimes: showtimesRoutes,
})

export type AppRouter = typeof appRouter

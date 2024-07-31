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
import { stripeRoutes } from './stripe'
import { ticketsRoutes } from './tickets'

export const appRouter = createTRPCRouter({
  movies: moviesRouter,
  admins: adminsRouter,
  cinemas: cinemasRoutes,
  managers: managersRoutes,
  showtimes: showtimesRoutes,
  stripe: stripeRoutes,
  tickets: ticketsRoutes,
})

export type AppRouter = typeof appRouter

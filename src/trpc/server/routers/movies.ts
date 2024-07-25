import { schemaCreateMovie } from '@/forms/createMovie'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'

export const moviesRouter = createTRPCRouter({
  movies: publicProcedure.query(({ ctx }) => {
    return ctx.db.movie.findMany()
  }),
  createMovie: protectedProcedure('admin')
    .input(schemaCreateMovie)
    .mutation(({ ctx, input }) => {
      return ctx.db.movie.create({
        data: input,
      })
    }),
})

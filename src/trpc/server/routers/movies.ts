import { createTRPCRouter, publicProcedure } from '..'

export const moviesRouter = createTRPCRouter({
  movies: publicProcedure.query(({ ctx }) => {
    return ctx.db.movie.findMany()
  }),
})

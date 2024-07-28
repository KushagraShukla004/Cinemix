import { TRPCError } from '@trpc/server'
import { createTRPCRouter, protectedProcedure } from '..'
import { schemaCreateAdmin } from '@/forms/createAdmin'

export const adminsRouter = createTRPCRouter({
  dashboard: protectedProcedure('admin').query(async ({ ctx }) => {
    const [cinema, movie, admin, manager, user] = await Promise.all([
      ctx.db.cinema.count(),
      ctx.db.movie.count(),
      ctx.db.admin.count(),
      ctx.db.manager.count(),
      ctx.db.user.count(),
    ])

    return { cinema, movie, admin, manager, user }
  }),
  create: protectedProcedure('admin')
    .input(schemaCreateAdmin)
    .mutation(async ({ ctx, input }) => {
      const admin = ctx.db.admin.findUnique({ where: input })
      if (!admin) {
        return new TRPCError({
          code: 'BAD_REQUEST',
          message: 'The user already an admin!',
        })
      }
      return ctx.db.admin.create({ data: { id: input.id } })
    }),
  admins: protectedProcedure('admin').query(async ({ ctx }) => {
    return ctx.db.admin.findMany({
      include: { User: true },
    })
  }),
  adminMe: protectedProcedure().query(async ({ ctx }) => {
    return ctx.db.admin.findUnique({
      where: { id: ctx.userId },
      include: { User: true },
    })
  }),
})

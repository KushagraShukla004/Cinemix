import { schemaCreateManager } from '@/forms/createManager'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'

export const managersRoutes = createTRPCRouter({
  create: protectedProcedure('admin')
    .input(schemaCreateManager)
    .mutation(({ ctx, input }) => {
      return ctx.db.manager.create({ data: { id: input.id } })
    }),
  managers: protectedProcedure().query(async ({ ctx }) => {
    return ctx.db.manager.findMany({
      include: { User: true },
    })
  }),
  managerMe: protectedProcedure().query(async ({ ctx }) => {
    return ctx.db.manager.findUnique({
      where: { id: ctx.userId },
      include: { User: true },
    })
  }),
  dashboard: protectedProcedure('admin', 'manager').query(async ({ ctx }) => {
    const uid = ctx.userId
    const [cinema, showtime] = await Promise.all([
      ctx.db.cinema.count({ where: { Managers: { some: { id: uid } } } }),
      ctx.db.showtime.count({
        where: { Screen: { Cinema: { Managers: { some: { id: uid } } } } },
      }),
    ])

    return { cinema, showtime }
  }),
})

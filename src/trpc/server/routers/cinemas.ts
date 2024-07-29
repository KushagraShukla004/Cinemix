import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { schemaCreateCinema } from '@/forms/createCinema'
import { findManyCinemaArgsSchema } from './dtos/cinemas.input'

export const cinemasRoutes = createTRPCRouter({
  cinemas: publicProcedure.query(({ ctx }) => {
    return ctx.db.cinema.findMany({
      include: {
        Screens: { include: { Showtimes: { include: { Movie: true } } } },
      },
    })
  }),
  createCinema: protectedProcedure('admin')
    .input(schemaCreateCinema)
    .mutation(({ ctx, input }) => {
      const { address, cinemaName, screens, managerId } = input

      const screensWithSeats = screens.map((screen, index) => {
        const { rows, columns, ...screenData } = screen
        const seats = []

        for (let row = 1; row <= rows; row++) {
          for (let column = 1; column <= columns; column++) {
            seats.push({ row, column })
          }
        }

        return {
          ...screenData,
          Seats: { create: seats },
          number: index,
        }
      })

      return ctx.db.cinema.create({
        data: {
          name: cinemaName,
          Address: { create: address },
          Managers: {
            connectOrCreate: {
              create: { id: managerId },
              where: { id: managerId },
            },
          },
          Screens: { create: screensWithSeats },
        },
      })
    }),
  myCinemas: protectedProcedure()
    .input(findManyCinemaArgsSchema.omit({ addressWhere: true }))
    .query(({ ctx, input }) => {
      return ctx.db.cinema.findMany({
        ...input,
        where: {
          ...input.where,
          Managers: { some: { id: ctx.userId } },
        },
        include: {
          Screens: { include: { Showtimes: { include: { Movie: true } } } },
        },
      })
    }),
  myScreens: protectedProcedure().query(({ ctx }) => {
    return ctx.db.screen.findMany({
      where: {
        Cinema: {
          Managers: { some: { id: ctx.userId } },
        },
      },
      include: {
        Cinema: true,
      },
    })
  }),
})

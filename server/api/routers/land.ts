import { z } from 'zod'

import { createTRPCRouter, protectedProcedure, publicProcedure } from '@/server/api/trpc'

export const landRouter = createTRPCRouter({
  get: publicProcedure.input(z.object({ userId: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.land.findUnique({ where: { userId: input.userId } })
  }),

  update: protectedProcedure
    .input(z.object({ userId: z.string(), stuffs: z.any() }))
    .mutation(async ({ ctx, input }) => {
      const existingLand = await ctx.db.land.findUnique({ where: { userId: input.userId } })
      if (!existingLand) {
        await ctx.db.land.create({
          data: {
            userId: input.userId,
            stuffs: input.stuffs,
          },
        })
      }

      return ctx.db.land.update({ where: { userId: input.userId }, data: { stuffs: input.stuffs } })
    }),
})

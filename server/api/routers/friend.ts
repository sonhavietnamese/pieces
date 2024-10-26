import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@/server/api/trpc'

export const friendRouter = createTRPCRouter({
  add: protectedProcedure
    .input(z.object({ friendId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const friendUser = await ctx.db.user.findUnique({
        where: { id: input.friendId },
      })

      if (!friendUser) {
        throw new Error('Friend user does not exist')
      }

      return ctx.db.friend.create({
        data: { userId: ctx.session.user.id, friendId: input.friendId },
      })
    }),

  unfriend: protectedProcedure
    .input(z.object({ friendId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.friend.delete({
        where: { userId_friendId: { userId: ctx.session.user.id, friendId: input.friendId } },
      })
    }),

  isFriend: protectedProcedure
    .input(z.object({ friendId: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.friend.findFirst({
        where: { userId: ctx.session.user.id, friendId: input.friendId },
      })
    }),
})

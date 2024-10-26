import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

export const userRouter = createTRPCRouter({
  get: publicProcedure.input(z.object({ username: z.string() })).query(async ({ ctx, input }) => {
    return ctx.db.user.findUnique({ where: { username: input.username } })
  }),
})

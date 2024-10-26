import { friendRouter } from '@/server/api/routers/friend'
import { userRouter } from '@/server/api/routers/user'
import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  friend: friendRouter,
  user: userRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.friend.add({ friendId: '123' });
 *       ^? Friend
 */
export const createCaller = createCallerFactory(appRouter)

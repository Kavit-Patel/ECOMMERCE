import { createTRPCRouter } from "../trpc";
import { categoryRouter } from "./category/categoryRouter";
import { userRouter } from "./user/userRouter";

export const appRouter = createTRPCRouter({
  user: userRouter,
  category: categoryRouter,
});

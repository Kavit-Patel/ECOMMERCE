// import { z } from "zod";
// import { createTRPCRouter, publicProcedure } from "../../trpc";

// export const categoryRouter = createTRPCRouter({
//   getAllCategories: publicProcedure
//     .input(
//       z.object({
//         userId: z.string(),
//         page: z.number().default(1),
//         limit: z.number().default(6),
//       }),
//     )
//     .query(async ({ ctx, input }) => {
//       const { userId, page, limit } = input;

//       const user = await ctx.db.user.findUnique({
//         where: { id: userId },
//       });
//       if (!user) {
//         throw new Error("User is invalid!");
//       }

//       const skip = (page - 1) * limit;

//       const allCategories = await ctx.db.category.findMany({
//         skip,
//         take: limit,
//         orderBy: { id: "asc" },
//       });

//       const totalCategories = await ctx.db.category.count();

//       return {
//         success: true,
//         allCategories,
//         totalCategories,
//         currentPage: page,
//         totalPages: Math.ceil(totalCategories / limit),
//       };
//     }),
//   getUserCategories: publicProcedure
//     .input(z.object({ userId: z.string() }))
//     .query(async ({ ctx, input }) => {
//       const { userId } = input;

//       const userCategories = await ctx.db.userCategory.findMany({
//         where: { userId },
//         select: { categoryId: true },
//       });

//       return userCategories.map((uc) => uc.categoryId);
//     }),
//   saveUserCategories: publicProcedure
//     .input(
//       z.object({
//         userId: z.string(),
//         categoryIds: z.array(z.number()),
//       }),
//     )
//     .mutation(async ({ ctx, input }) => {
//       const { userId, categoryIds } = input;

//       // First, delete all existing categories for the user
//       await ctx.db.userCategory.deleteMany({
//         where: { userId },
//       });

//       // Then, create new user-category relationships
//       await ctx.db.userCategory.createMany({
//         data: categoryIds.map((categoryId) => ({
//           userId,
//           categoryId,
//         })),
//       });

//       return {
//         success: true,
//       };
//     }),
// });

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const categoryRouter = createTRPCRouter({
  getAllCategories: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        page: z.number().default(1),
        limit: z.number().default(6),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { userId, page, limit } = input;

      const user = await ctx.db.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new Error("User is invalid!");
      }

      const skip = (page - 1) * limit;

      const allCategories = await ctx.db.category.findMany({
        skip,
        take: limit,
        orderBy: { id: "asc" },
      });

      const totalCategories = await ctx.db.category.count();

      // Fetch user's selected categories
      const selectedCategories = await ctx.db.userCategory.findMany({
        where: { userId },
        select: { categoryId: true },
      });

      const selectedCategoryIds = selectedCategories.map(
        (category) => category.categoryId,
      );

      return {
        success: true,
        allCategories,
        selectedCategoryIds,
        totalCategories,
        currentPage: page,
        totalPages: Math.ceil(totalCategories / limit),
      };
    }),
  saveUserCategories: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        categoryIds: z.array(z.number()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, categoryIds } = input;

      // First, delete all existing categories for the user
      await ctx.db.userCategory.deleteMany({
        where: { userId },
      });

      // Then, create new user-category relationships
      await ctx.db.userCategory.createMany({
        data: categoryIds.map((categoryId) => ({
          userId,
          categoryId,
        })),
      });

      return {
        success: true,
      };
    }),
});

import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { sign, verify } from "jsonwebtoken";
import { sendVerificationEmail } from "~/utils/email";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        userName: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const code = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");
      const user = await ctx.db.user.create({
        data: {
          userName: input.userName,
          email: input.email,
          password: input.password,
          verificationToken: code,
        },
      });
      await sendVerificationEmail(input.email, code);

      return { success: true, user };
    }),
  verifyUser: publicProcedure
    .input(z.object({ code: z.string(), userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(input);
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });
      if (!user) {
        throw new Error("User in invalid !");
      }
      const matchCode = input.code === user.verificationToken;
      if (!matchCode) {
        throw new Error("Varification Code is not Correct !");
      }
      const updatedUser = await ctx.db.user.update({
        where: { id: input.userId },
        data: {
          emailVerified: true,
          verificationToken: null,
        },
      });
      const token = sign(
        { userId: user.id },
        process.env.JWT_SECRET ?? "jwtsecret@!23",
      );
      return { success: true, updatedUser, token };
    }),
  loginUser: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });
      if (!user) {
        throw new Error("Invalid email !");
      }
      const matchPassword = user.password === input.password;
      if (!matchPassword) {
        throw new Error("Invalid password !");
      }
      const token = sign(
        { userId: user.id },
        process.env.JWT_SECRET ?? "jwtsecret@!23",
      );
      return { success: true, user, token };
    }),
  cookieLogin: publicProcedure.mutation(async ({ ctx }) => {
    const token = ctx.headers
      .get("cookie")
      ?.split(" ")
      .filter((el) => el.includes("category_token"))[0]
      ?.split("=")[1];
    if (!token) {
      throw new Error("token is not present !");
    }
    const matchToken = verify(
      token,
      process.env.JWT_SECRET ?? "jwtsecret@!23",
    ) as { userId: string };
    let userId: string | undefined = undefined;
    if (typeof matchToken == "object" && "userId" in matchToken) {
      userId = matchToken.userId;
      const user = await ctx.db.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error("user doesnot exists !");
      }
      return { success: true, user, token };
    } else {
      throw new Error("Token Varification Failed !");
    }
  }),
  getUsers: publicProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findMany();
    return { success: true, user };
  }),
});

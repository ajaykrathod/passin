import { prisma } from "$/lib/prisma";
import { procedure, router } from "./trpc";
import { z } from "zod";
import { randomUUID } from "crypto";

export const appRouter = router({
  createUser: procedure
    .input(
      z.object({
        first: z.string(),
        last: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (opts) => {
      const res = await prisma.user.create({
        data: {
            uid:randomUUID(),
            firstName:opts.input.first,
            lastName:opts.input.last,
            email:opts.input.email,
            hash:opts.input.password
        },
        select:{
            email:true,
            firstName:true,
            lastName:true
        }
      });
      return res
    }),
  getUser: procedure.input(z.object({email:z.string(),uid:z.string()})).query(async(opts) => {
    const user = await prisma.user.findFirst({
      where:{
        OR:[
          {
            email:opts.input.email
          },
          {
            uid:opts.input.uid
          }
        ]
      },
      select:{
        id:false,
        uid:true,
        email:true,
        firstName:true,
        lastName:true,
        hash:true
      }
    })
    return user
  }),
});

export type AppRouter = typeof appRouter;

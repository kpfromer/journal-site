import {
  extendType,
  intArg,
  nonNull,
  objectType,
  queryType,
  stringArg,
} from "nexus";

import { OrgPage } from "nexus-prisma";

export const OrgPageSchema = objectType({
  name: OrgPage.$name,
  description: OrgPage.$description,
  definition(t) {
    t.field(OrgPage.id);
    t.field(OrgPage.slug);
    t.field(OrgPage.content);
  },
});

export const Query = queryType({
  definition(t) {
    t.nonNull.list.nonNull.field("getOrgPages", {
      type: "OrgPage",
      resolve: (parent, args, ctx) => {
        return ctx.prisma.orgPage.findMany();
      },
    });
  },
});

export const MutationAccount = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createOrgPage", {
      type: "OrgPage",
      args: {
        slug: nonNull(stringArg()),
        content: nonNull(stringArg()),
      },
      async resolve(_, { slug, content }, ctx) {
        return ctx.prisma.orgPage.create({
          data: {
            slug,
            content,
          },
        });
      },
    });

    t.nonNull.field("deleteOrgPage", {
      type: "Boolean",
      args: {
        id: nonNull(intArg()),
      },
      async resolve(_, { id }, ctx) {
        try {
          await ctx.prisma.orgPage.delete({
            where: { id },
          });
          return true;
        } catch {
          return false;
        }
      },
    });
  },
});

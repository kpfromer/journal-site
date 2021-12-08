import * as types from "./types";

import { makeSchema } from "nexus";
import path from "path";

const base = (dest: string): string =>
  path.join(process.cwd(), "lib/graphql", dest);

const schemaWithoutPermissions = makeSchema({
  types,
  sourceTypes: {
    modules: [
      {
        module: "@prisma/client",
        alias: "prisma",
      },
    ],
  },
  contextType: {
    module: base("context.ts"),
    export: "Context",
  },
  outputs: {
    schema: base("../schema.graphql"),
    typegen: base("./schema.gen.ts"),
  },
  shouldExitAfterGenerateArtifacts: Boolean(
    process.env.NEXUS_SHOULD_EXIT_AFTER_REFLECTION
  ),
});

export const schema = schemaWithoutPermissions;

import React from "react";
import mutate from "@orgajs/reorg-rehype";
import parse from "@orgajs/reorg-parse";
import rehypeStringify from "rehype-stringify";
import rehypeToc from "@jsdevtools/rehype-toc";
import { unified } from "unified";

export const testProcessor = unified().use(parse);

export const processor = unified()
  .use(parse)
  .use(mutate)
  .use(rehypeToc)
  .use(rehypeStringify);

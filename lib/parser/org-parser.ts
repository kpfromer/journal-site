import mutate from "@orgajs/reorg-rehype";
import parse from "@orgajs/reorg-parse";
import rehypeStringify from "rehype-stringify";
import { transformHeadings } from "./transform-headings";
import { unified } from "unified";

export const processor = unified()
  .use(parse)
  .use(mutate)
  .use(transformHeadings)
  .use(rehypeStringify);

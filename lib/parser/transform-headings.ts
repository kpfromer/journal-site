import { DateTime } from "luxon";
import { Node } from "unist";
import { Processor } from "unified";

type Options = {};

export function transformHeadings(
  this: Processor,
  opts?: Options
): Transformer {
  function transformHeadingText(node: Node) {
    if (isText(node) && node.value.trim().length !== 0) {
      const convert: [format: string, to: (time: DateTime) => string][] = [
        [
          "[yyyy-MM-dd EEE T]",
          (date) => date.toLocaleString(DateTime.TIME_SIMPLE),
        ],
        ["yyyy-MM-dd EEEE", (date) => date.toLocaleString(DateTime.DATE_MED)],
        ["yyyy-MM MMMM", (date) => date.toFormat("MMMM")],
      ];

      const dateString = tryConvert(node.value, convert);
      if (typeof dateString === "string") {
        node.value = dateString;
      }
    }
  }

  function recursiveFindHeadings(node: Node, list: Node[]): void {
    if (
      typeof node === "object" &&
      node.type === "element" &&
      typeof node.tagName === "string" &&
      ["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)
    ) {
      list.push(node);
    }

    if (node.children) {
      for (let child of node.children) {
        recursiveFindHeadings(child, list);
      }
    }
  }
  function findHeadings(node: Node) {
    const headings: Node[] = [];
    recursiveFindHeadings(node, headings);
    return headings;
  }
  return function transformer(root: Node): Node {
    const headings = findHeadings(root);
    console.dir({ headings }, { depth: null });
    headings.forEach((heading) =>
      heading.children.forEach(transformHeadingText)
    );

    return root;
  };
}

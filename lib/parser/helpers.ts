import { DateTime } from "luxon";

// TODO: better typing
export function isHeading(node: Node): boolean {
  return (
    typeof node === "object" &&
    (node as any).type === "element" &&
    typeof (node as any).tagName === "string" &&
    ["h1", "h2", "h3", "h4", "h5", "h6"].includes((node as any).tagName)
  );
}

export function isText(node: Node): boolean {
  return (
    typeof node === "object" &&
    (node as any).type === "text" &&
    typeof (node as any).value === "string"
  );
}

export function tryConvert(
  value: string,
  conversions: [fromFormat: string, toString: (time: DateTime) => string][]
): string | undefined {
  for (let [format, to] of conversions) {
    const date = DateTime.fromFormat(value, format);
    if (date.isValid) {
      return to(date);
    }
  }
  return undefined;
}

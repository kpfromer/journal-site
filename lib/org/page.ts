import getClient from "../prisma";
import { processor } from "../parser/org-parser";

export async function getPageContentBySlug(
  slug: string
): Promise<string | undefined> {
  const dbItem = await getClient().orgPage.findFirst({
    where: { slug },
  });

  if (dbItem) {
    const data = (await processor.process(dbItem.content)).value.toString();

    return data;
  } else {
    return undefined;
  }
}

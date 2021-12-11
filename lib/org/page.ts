import prisma from "../prisma";
import { processor } from "../org-parser";

export async function getPageContentBySlug(
  slug: string
): Promise<string | undefined> {
  const dbItem = await prisma.orgPage.findFirst({
    where: { slug },
  });

  if (dbItem) {
    const data = (await processor.process(dbItem.content)).value.toString();

    return data;
  } else {
    return undefined;
  }
}

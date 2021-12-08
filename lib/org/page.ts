import { PrismaClient } from "@prisma/client";
import { processor } from "../org-parser";

export async function getPageContentBySlug(
  slug: string
): Promise<string | undefined> {
  const client = new PrismaClient();

  const dbItem = await client.orgPage.findFirst({
    where: { slug },
  });

  if (dbItem) {
    const data = (await processor.process(dbItem.content)).value.toString();

    return data;
  } else {
    return undefined;
  }
}

import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import Head from "next/head";
import { promises as fs } from "fs";
import path from "path";
import { processor } from "../lib/org-parser";

const getPageFile = (file?: string) =>
  path.join(process.cwd(), "data", file ?? "");

const getPages = async () => {
  const files = [];

  const items = await fs.readdir(getPageFile());

  for (const item of items) {
    const stat = await fs.stat(getPageFile(item));

    if (stat.isFile()) {
      files.push(path.parse(item).name);
    }
  }

  return files;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await getPages();

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const rawData = await fs.readFile(getPageFile(`${params?.slug}.org`));
  const data = rawData.toString();

  return {
    props: {
      data,
    },
  };
};

const Home: NextPage<{ data: string }> = ({ data }) => {
  console.log(processor.processSync(data));
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-6 max-w-2xl mx-auto">
        <div className="flex flex-col space-y-3">
          <h1 className="text-5xl font-extrabold">Journal</h1>
          <span>Kyle Pfromer</span>
        </div>

        <hr className="my-6" />

        <div
          className="mx-auto prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: processor.processSync(data).value.toString(),
          }}
        />
      </main>
    </div>
  );
};

export default Home;
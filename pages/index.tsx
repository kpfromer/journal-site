import type { GetStaticProps, NextPage } from "next";

import Head from "next/head";
import Image from "next/image";
import { promises as fs } from "fs";
import path from "path";
import { processor } from "../lib/org-parser";
import styles from "../styles/Home.module.css";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const rawData = await fs.readFile(path.join(process.cwd(), "data/test.org"));
  const data = rawData.toString();

  return {
    props: {
      data,
    },
  };
};

const Home: NextPage = ({ data }) => {
  console.log(processor.processSync(data));
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* {processor.processSync(data).result} */}
        <div
          className="prose"
          dangerouslySetInnerHTML={{
            __html: processor.processSync(data).value.toString(),
          }}
        />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;

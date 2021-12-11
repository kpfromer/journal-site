import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import { getPageContentBySlug } from "../lib/org/page";
import OrgFilePage from "../components/OrgFilePage";

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = (params?.slug ?? "") as string;
  const data = await getPageContentBySlug(slug);

  if (data === undefined) {
    return { notFound: true };
  }

  return {
    props: {
      data,
    },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
};

const Home: NextPage<{ data: string }> = ({ data }) => {
  return (
    <OrgFilePage title="Journal" content={data} />
  );
};

export default Home;

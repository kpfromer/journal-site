import type { GetServerSideProps, NextPage } from "next";

import OrgFilePage from "../components/OrgFilePage";
import { getPageContentBySlug } from "../lib/org/page";

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getPageContentBySlug("default");

  if (data === undefined) {
    return { notFound: true };
  }

  return {
    props: {
      data,
    },
  };
};

const Home: NextPage<{ data: string }> = ({ data }) => {
  return <OrgFilePage title="Journal" content={data} />;
};

export default Home;

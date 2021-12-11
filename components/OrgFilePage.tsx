import { useRouter } from "next/router";
import Head from "next/head";

export interface OrgFilePageProps {
  title: string;
  description?: string;
  content: string;
}

const OrgFilePage: React.FC<OrgFilePageProps> = ({
  title,
  description,
  content,
}) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-6 max-w-2xl mx-auto px-3 md:px-0">
        <div className="flex flex-col space-y-3">
          <h1 className="text-5xl font-extrabold">{title}</h1>
          <span>Kyle Pfromer</span>
        </div>
        <hr className="my-6" />
        {router.isFallback ? (
          <div className="mx-auto prose max-w-none">Loading...</div>
        ) : (
          <div
            className="mx-auto prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
        )}
      </main>
    </>
  );
};

export default OrgFilePage;

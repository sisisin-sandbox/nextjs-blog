import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';
import type { GetStaticPaths, GetStaticProps } from 'next';

export default function Post({ postData }: { postData: { title: string; contentHtml: string; date: string } }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date}></Date>
        </div>

        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return { paths, fallback: false };
};

type Re = {
  postData: {
    id: string;
    contentHtml: string;
  };
};
export const getStaticProps: GetStaticProps<Re, { id: string }> = async (context) => {
  const postData = await getPostData(context.params!.id);
  return { props: { postData } };
};

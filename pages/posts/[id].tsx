import { useRouter } from 'next/router';
import Link from 'next/link';
import '../globals.css';
import Head from 'next/head';
import Date from '../../components/date';
import markdownStyles from '../markdown-styles.module.css';

 
export default function Page({postData}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
  <>
  <Head>
        <title>{postData.title}</title>
      </Head>
  <div className="flex flex-row-reverse space-x-4 space-x-reverse mx-5 my-3 space-x-10 text-cyan-600">
      <Link href="/posts">Post</Link>
      <Link href="/about">About</Link>
      <Link href="/">Home</Link>
    </div>
    <div className="mx-80">
    <div className="mb-8 mt-6">
            <div className="flex justify-center">
              <p className='text-4xl font-semibold text-slate-800 justify-center'>{postData.title}</p>
              
            </div>
            <div className="mt-5">
              
              <Date dateString={postData.date} />
            </div>
            <div className="mt-8">
            <div 
              className={markdownStyles['markdown-body']}
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </div>
          </div>
    </div>
  </>
  )
}

import { getAllPostIds, getPostData } from '../../lib/posts';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext<{id: string}>) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params?.id || '');

  return {
    props: {
      postData,
    },
  };
}
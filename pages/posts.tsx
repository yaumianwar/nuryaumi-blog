
import Link from 'next/link';
import './globals.css';

import Date from '../components/date';
import Pagination from '../components/pagination';

import { getSortedPostsData } from '../lib/posts';
import { useState, useEffect } from "react";
import {paginate} from '../utils/index';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Page({allPostsData}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedPosts = paginate(allPostsData, currentPage, pageSize);
  return (
    <>
    <div className="flex flex-row-reverse space-x-4 space-x-reverse mx-5 my-3 space-x-10 text-cyan-600">
      <Link href="/posts">Posts</Link>
      <Link href="/about">About</Link>
      <Link href="/">Home</Link>
    </div>

    <div className="mx-80">
    {paginatedPosts.map(({ id, date, title, intro }) => (
      <a href={`/posts/${id}`} key={id}>
            <div className="mb-8 mt-6">
            <div className="flex justify-between">
              <div className='text-3xl font-semibold text-slate-800'>{title}</div>
              <Date dateString={date} />
            </div>
            <div className="mt-2">
              <p className='text-slate-500'>
                {intro}
              </p>
            </div>
          </div>
          </a>
          ))}

<Pagination
        items={allPostsData.length} // 100
        currentPage={currentPage} // 1
        pageSize={pageSize} // 10
        onPageChange={onPageChange}
      />
      
    </div>
    </>
  )
}
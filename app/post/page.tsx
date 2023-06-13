import HelloWorld from './hello.mdx';
import Link from 'next/link';
 
export default function Page() {
  return <>
  <div className="flex flex-row-reverse space-x-4 space-x-reverse mx-5 my-3 space-x-10 text-cyan-600">
      <Link href="/posts">Post</Link>
      <Link href="/about">About</Link>
      <Link href="/">Home</Link>
    </div>
    <div className="mx-80">
        <HelloWorld />
    </div>
  </>;
}
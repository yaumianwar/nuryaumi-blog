import Image from 'next/image';
import Link from 'next/link';

import './globals.css';
import avatar from '../src/yaumi-foto.jpeg';

export default function Page() {
  return (
    <>
    <div className="flex flex-row-reverse space-x-4 space-x-reverse mx-5 my-3 space-x-10 text-cyan-600">
      <Link href="/posts">Post</Link>
      <Link href="/about">About</Link>
      <Link href="/">Home</Link>
    </div>

    <div className="mx-80">
      <div >
      <div className="flex justify-center pb-4 pt-4">
        <Image
          src={avatar}
          width={300}
          height={300}
          alt="Picture of the author"
          
        />
      </div>

      </div>
      <div></div>
      <div className="mb-6 mt-6">
        <div className="flex justify-between">
          <div className='text-3xl font-semibold text-slate-800'>Hello . . . . :)</div>
        </div>
        <div className="mt-2 flex flex-col space-y-4 text-slate-500">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged.
          </p>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged.
          </p>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged.
          </p>
        </div>
      </div>

      <div className="mb-6 mt-6">
        <div className="flex justify-between">
          <div className='text-3xl font-semibold text-slate-800'>Education</div>
        </div>
        <div className="mt-2 flex flex-col space-y-1">
          <p className='text-slate-500'>
            Bachelor Degree - Education of Informatics and Technology
          </p>
          <p className='text-slate-500'>
            Makassar State University
          </p>

        </div>
      </div>

      <div className="mb-6 mt-6">
        <div className="flex justify-between">
          <div className='text-3xl font-semibold text-slate-800'>Experience</div>
        </div>
        <div className="mt-2 flex flex-col space-y-1">
          <p className='text-slate-500'>
            2018 - 2021 &nbsp; Backend Developer at Valutac
          </p>
          <p className='text-slate-500'>
          Responsible for playing a key role in the designing, developing, improving, maintaining, and testing backend services and APIs
          </p>

        </div>
      </div>

      <div className="mb-6 mt-6">
        <div className="flex justify-between">
          <div className='text-3xl font-semibold text-slate-800'>Licenses & certifications</div>
        </div>
        <div className="mt-2 flex flex-col space-y-1">
          <p className='text-slate-500'>
          Certified Associate  Data Analyst - Datacamp
          </p>
          <a href='https://www.datacamp.com/certificate/DAA0012803751690' className='text-slate-500'>
          Credential ID DAA0012803751690
          </a>

        </div>
      </div>
      
    </div>
    </>
  )
}
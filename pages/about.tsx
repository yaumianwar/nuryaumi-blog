import Image from 'next/image';
import Link from 'next/link';

import './globals.css';
import styles from "../pages/Home.module.css";
import avatar from '../src/yaumi.jpg';

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
            I&apos;m Nur Yaumi, i&apos;s Yaumi for short. I&apos;m a house wife and a mom of a 1yo daughter.
            Before being a fulltime mom, I&apos;m a backend developer with 4 years experience.
            I dedicated all of my time to take care my daughter and husband without house maid and baby sitter.
            As my daughter grow up and I have a little leisure time, I want to back code and learn again. 
          </p>

          <p>
            Currently, I take an english course also learn about data engineering and analysis. The last thing that I did 
            as backend developer is processing a large dataset and I really love to doing it. I learn how to clean the data,
            process the data and create data visualization.
          </p>

        </div>
      </div>

      <div className="mb-6 mt-6">
        <div className="flex justify-between">
          <div className='text-3xl font-semibold text-slate-800'>Skills</div>
        </div>
        <div className="mt-2 flex flex-col space-y-1 pl-5">
        <ul className={styles.listItem}>
          <li className='text-slate-500'>Python</li>
          <li className='text-slate-500'>MySQL</li>
          <li className='text-slate-500'>Rest API</li>
          <li className='text-slate-500'>Data Analysis</li>
          <li className='text-slate-500'>Data Vizualization</li>
        </ul>

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
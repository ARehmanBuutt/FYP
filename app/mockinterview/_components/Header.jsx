"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link';

function Header() {

    const path = usePathname();
    useEffect(() => {

    }, [])

    return (
        <div id='no-print' className='flex p-1 items-center justify-between bg-secondary shadow-sm'>
            {/* <Image src={'/logo-transparent-png.png'} width={270} height={0} alt='logo' /> */}
            <Image src={'/logo-transparent-svg.svg'} width={120} height={0} alt='logo' />

            <ul className='hidden md:flex gap-6'>

                <Link href={'/dashboard'}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/dashboard` && `text-primary font-bold`}
                    `}>
                        Dashboard
                    </li>
                </Link>

                <Link href={'/mockinterview'}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/mockinterview` && `text-primary font-bold`}
                    `}>
                        Mock Interview
                    </li>
                </Link>

                <Link href={'/resumebuilder'}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/resumebuilder` && `text-primary font-bold`}
                    `}>
                        Resume Builder
                    </li>
                </Link>

                <Link href={'/interviewprep'}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/interviewprep` && `text-primary font-bold`}
                    `}>
                        Interview Prep
                    </li>
                </Link>

                <Link href={'/jobsuggestion'}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/jobsuggestion` && `text-primary font-bold`}
                    `}>
                        Job Suggestion
                    </li>
                </Link>

                <Link href={'/contact'}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/contact` && `text-primary font-bold`}
                    `}>
                        Contact
                    </li>
                </Link>

            </ul>
            <UserButton />
        </div>
    )
}

export default Header

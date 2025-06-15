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

                <Link href={'/'}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/` && `text-primary font-bold`}
                    `}>
                        Home
                    </li>
                </Link>

                <Link href={'/dashboard'}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/dashboard` && `text-primary font-bold`}
                    `}>
                        Mock-Interview
                    </li>
                </Link>

                <Link href={'/resumebuilder'}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/resumebuilder` && `text-primary font-bold`}
                    `}>
                        Resume Builder
                    </li>
                </Link>

                <Link href={'/suggestions'}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/suggestions` && `text-primary font-bold`}
                    `}>
                        Job Suggestions
                    </li>
                </Link>

                <Link href={'/about'}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/about` && `text-primary font-bold`}
                    `}>
                        About
                    </li>
                </Link>

            </ul>
            <UserButton />
        </div>
    )
}

export default Header

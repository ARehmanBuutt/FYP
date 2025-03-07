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
        <div id='no-print' className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Image src={'/logo.svg'} width={160} height={100} alt='logo' />

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
                    DashBoard
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

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
        <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'>
            <Image src={'/logo.svg'} width={160} height={100} alt='logo' />

            <ul className='hidden md:flex gap-6'>

                <Link href={'/'}>
                    <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/` && `text-primary font-bold`}
                    `}>
                        Home
                    </li>
                </Link>

                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/dashboard` && `text-primary font-bold`}
                    `}>
                    DashBoard
                </li>

                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/questions` && `text-primary font-bold`}
                    `}>
                    Questions
                </li>

                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/upgrade` && `text-primary font-bold`}
                    `}>
                    Upgrade
                </li>

                <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                    ${path == `/working` && `text-primary font-bold`}
                    `}>
                    Working
                </li>

            </ul>
            <UserButton />
        </div>
    )
}

export default Header

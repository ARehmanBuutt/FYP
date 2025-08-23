// "use client"
// import React, { useEffect } from 'react'
// import Image from 'next/image'
// import { usePathname } from 'next/navigation';
// import { UserButton } from '@clerk/nextjs'
// import Link from 'next/link';

// function Header() {

//     const path = usePathname();
//     useEffect(() => {

//     }, [])

//     return (
//         <div id='no-print' className='flex p-1 items-center justify-between bg-secondary shadow-sm'>
//             {/* <Image src={'/logo-transparent-png.png'} width={270} height={0} alt='logo' /> */}
//             <Image src={'/logo-transparent-svg.svg'} width={120} height={0} alt='logo' />

//             <ul className='hidden md:flex gap-6'>

//                 <Link href={'/dashboard'}>
//                     <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//                     ${path == `/dashboard` && `text-primary font-bold`}
//                     `}>
//                         Dashboard
//                     </li>
//                 </Link>

//                 <Link href={'/mockinterview'}>
//                     <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//                     ${path == `/mockinterview` && `text-primary font-bold`}
//                     `}>
//                         Mock Interview
//                     </li>
//                 </Link>

//                 <Link href={'/resumebuilder'}>
//                     <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//                     ${path == `/resumebuilder` && `text-primary font-bold`}
//                     `}>
//                         Resume Builder
//                     </li>
//                 </Link>

//                 <Link href={'/interviewprep'}>
//                     <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//                     ${path == `/interviewprep` && `text-primary font-bold`}
//                     `}>
//                         Interview Prep
//                     </li>
//                 </Link>

//                 <Link href={'/jobsuggestion'}>
//                     <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//                     ${path == `/jobsuggestion` && `text-primary font-bold`}
//                     `}>
//                         Job Suggestion
//                     </li>
//                 </Link>

//                 <Link href={'/contact'}>
//                     <li className={`hover:text-primary hover:font-bold transition-all cursor-pointer
//                     ${path == `/contact` && `text-primary font-bold`}
//                     `}>
//                         Contact
//                     </li>
//                 </Link>

//             </ul>
//             <UserButton />
//         </div>
//     )
// }

// export default Header


"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

function Header() {
    const path = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Mock Interview", href: "/mockinterview" },
        { name: "Resume Builder", href: "/resumebuilder" },
        { name: "Interview Prep", href: "/interviewprep" },
        { name: "Job Suggestion", href: "/jobsuggestion" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <div id='no-print' className='flex p-2 items-center justify-between bg-secondary shadow-sm'>
            {/* Logo */}
            <Image src={'/logo-transparent-svg.svg'} width={120} height={0} alt='logo' />

            {/* Desktop Navbar */}
            <ul className='hidden md:flex gap-6'>
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <li
                            className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                            ${path === item.href ? "text-primary font-bold" : ""}`}
                        >
                            {item.name}
                        </li>
                    </Link>
                ))}
            </ul>

            {/* Always show UserButton on desktop */}
            <div className='hidden md:block'>
                <UserButton />
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='md:hidden p-2'
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* Mobile Sidebar */}
            {isOpen && (
                <div className="fixed top-0 right-0 w-52 h-full bg-secondary shadow-lg p-6 z-50 flex flex-col gap-6">
                    {/* Close button */}
                    <button
                        className="self-end"
                        onClick={() => setIsOpen(false)}
                    >
                        <X size={24} />
                    </button>

                    {/* Nav Items */}
                    <ul className="flex flex-col gap-4">
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                                <li
                                    className={`hover:text-primary hover:font-bold transition-all cursor-pointer
                                    ${path === item.href ? "text-primary font-bold" : ""}`}
                                >
                                    {item.name}
                                </li>
                            </Link>
                        ))}
                    </ul>

                    {/* User Button inside sidebar */}
                    <div className="mt-auto">
                        <UserButton />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Header
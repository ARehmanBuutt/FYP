"use client"
import React, { useState, useEffect } from 'react'
import PersonalDetail from './form/PersonalDetail'
import { Button } from '../../../../components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summary from './form/Summary'
import Experience from './form/Experience'
import Education from './form/Education'
import Skills from './form/Skills'
import DownloadShare from './form/DownloadShare'
import { useRouter } from 'next/navigation';
import ThemeColor from './preview/ThemeColor'


const FormSection = () => {
    const [activeFormIndex, setActiveFormIndex] = useState(1)
    const [enabledNext, setEnableNext] = useState(false)
    const router = useRouter();

    return (
        <div>
            <div id='no-print' className='flex justify-between items-center mt-3'>

                <div className='flex gap-5'>

                    <ThemeColor />

                    <Button size='sm' onClick={() => router.push('/resumebuilder')}><Home /> Home </Button>

                </div>

                <div className='flex gap-2'>

                    {activeFormIndex < 6 ? (
                        <>
                            {activeFormIndex > 1 && (
                                <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
                                    <ArrowLeft /> Previous
                                </Button>
                            )}

                            <Button
                                // disabled={!enabledNext}
                                className="flex gap-2"
                                size="sm"
                                onClick={() => setActiveFormIndex(activeFormIndex + 1)}
                            >
                                Next <ArrowRight />
                            </Button>
                        </>
                    ) : (
                        <>
                            {activeFormIndex > 1 && (
                                <Button size="sm" onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
                                    <ArrowLeft /> Previous
                                </Button>
                            )}
                        </>
                    )}

                </div>
            </div>


            {/* Personal detail */}
            {activeFormIndex == 1 ? <PersonalDetail enabledNext={(v) => setEnableNext(v)} />
                : activeFormIndex == 2 ?
                    <Summary enabledNext={(v) => setEnableNext(v)} />
                    : activeFormIndex == 3 ?
                        <Experience enabledNext={(v) => setEnableNext(v)} />
                        : activeFormIndex == 4 ?
                            <Education enabledNext={(v) => setEnableNext(v)} />
                            : activeFormIndex == 5 ?
                                <Skills enabledNext={(v) => setEnableNext(v)} />
                                : activeFormIndex == 6 ?
                                    <DownloadShare />
                                    : null
            }

            {/* summary */}


            {/* exp */}


            {/* educational */}


            {/* skills */}

        </div>
    )
}

export default FormSection
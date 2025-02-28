"use client"
import React, { useState } from 'react'
import PersonalDetail from './form/PersonalDetail'
import { Button } from '../../../../components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summary from './form/Summary'
import Experience from './form/Experience'
import Education from './form/Education'

const FormSection = () => {
    const [activeFormIndex, setActiveFormIndex] = useState(1)
    const [enabledNext, setEnableNext] = useState(false)
    return (
        <div>
            <div className='flex justify-between items-center mt-3'>

                <Button variant='outline' size='sm' className='flex gap-2'>
                    <LayoutGrid /> Theme
                </Button>

                <div className='flex gap-2'>

                    {activeFormIndex > 1
                        && <Button size='sm'
                        onClick={() => setActiveFormIndex(activeFormIndex - 1)}
                        > <ArrowLeft /> Previoius</Button>}

                    <Button
                    disabled={!enabledNext}
                    className='flex gap-2' size='sm'
                    onClick={() => setActiveFormIndex(activeFormIndex + 1)}
                    >
                        Next
                         <ArrowRight />
                    </Button>
                </div>
            </div>

            {/* Personal detail */}
            { activeFormIndex==1? <PersonalDetail enabledNext={(v)=>setEnableNext(v)} />
            :activeFormIndex==2?
            <Summary enabledNext={(v)=>setEnableNext(v)}/>
            :activeFormIndex==3?
            <Experience enabledNext={(v)=>setEnableNext(v)}/>
            :activeFormIndex==4?
            <Education enabledNext={(v)=>setEnableNext(v)}/>
            :null
        }

            {/* summary */}


            {/* exp */}


            {/* educational */}


            {/* skills */}

        </div>
    )
}

export default FormSection
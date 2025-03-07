"use client"
import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../../../components/ui/popover"
import { Button } from '../../../../../components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext'



function ThemeColor() {
    const colors = [
        "#800000", // Maroon
        "#000000", // Black
        "#000080", // Navy
        "#654321", // Dark Brown
        "#2F4F4F", // Dark Slate Gray
        "#4B0082", // Indigo
        "#483D8B", // Dark Slate Blue
        "#2C3E50", // Midnight Blue
        "#8B0000", // Dark Red
        "#556B2F", // Dark Olive Green
        "#1C1C1C", // Almost Black
        "#191970", // Midnight Blue (Darker)
        "#3B3B3B", // Charcoal
        "#5D4037", // Dark Chestnut
        "#301934", // Dark Purple
        "#0D0D0D", // Jet Black
        "#800080", // Purple
        "#4A235A", // Dark Amethyst
        "#3D2B1F", // Bistre Brown
        "#36454F",  // Charcoal Gray
        "#A52A2A", // Brown
        "#2C2C2C", // Dark Gray
        "#1E3A5F", // Navy Blue (Muted)
        "#855E42", // Chestnut Brown
        "#3E4A59", // Slate Blue
        "#5A3E72", // Deep Purple
        "#435058", // Steel Blue
        "#9B2335", // Deep Red
        "#6B8E23", // Olive Drab
        "#2F2F2F", // Charcoal Gray
        "#2C3E50", // Dark Blue-Gray
        "#525252", // Muted Charcoal
        "#7B3F00", // Bronze Brown
        "#50394C", // Deep Plum
        "#4E342E", // Dark Mocha
        "#644E5B", // Muted Burgundy
        "#5C4033", // Cocoa Brown
        "#584E4A", // Muted Espresso
        "#505A5B", // Deep Slate
        "#4C4F56"  // Gunmetal Gray

    ]
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
    const [selectedColor, setSelectedColor] = useState()

    const onColorSelect = (color) => {
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor: color
        })
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' size='sm' className='flex gap-2'>
                    <LayoutGrid /> Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className='grid grid-cols-5 gap-2'>
                    {colors.map((item, index) => (
                        <div
                            onClick={() => onColorSelect(item)}
                            className={`h-5 w-5 rounded-full cursor-pointer
                    border hover:border-black
                    ${selectedColor == item && 'border-black'}
                    `}
                            style={{
                                background: item
                            }}>

                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>


    )
}

export default ThemeColor
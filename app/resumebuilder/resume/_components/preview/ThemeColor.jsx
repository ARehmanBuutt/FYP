"use client";
import React, { useContext, useEffect, useState } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../../../components/ui/popover";
import { Button } from "../../../../../components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { db } from "../../../../../utils/db";
import { resumes } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { useSearchParams } from "next/navigation";

function ThemeColor() {
    const colors = [
        "#800000", "#000000", "#000080", "#654321", "#2F4F4F",
        "#4B0082", "#483D8B", "#2C3E50", "#8B0000", "#556B2F",
        "#1C1C1C", "#191970", "#3B3B3B", "#5D4037", "#301934",
        "#0D0D0D", "#800080", "#4A235A", "#3D2B1F", "#36454F"
    ];

    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [resumeId, setResumeId] = useState(null);
    const searchParams = useSearchParams();

    // 🔹 Get `resumeId` from URL or state
    useEffect(() => {
        const id = window.location.pathname.split("/")[3] || searchParams.get("resumeId");
        console.log("📌 Found resumeId:", id);
        if (id) {
            setResumeId(id);
            fetchThemeColor(id);
        }
    }, [searchParams]);

    // 🔹 Fetch theme color from DB
    const fetchThemeColor = async (id) => {
        try {
            console.log(`📥 Fetching theme color for resumeId: ${id}`);
            const result = await db.select({ themeColor: resumes.themeColor })
                .from(resumes)
                .where(eq(resumes.resumeId, id));

            if (result.length > 0 && result[0].themeColor) {
                console.log("🎨 Theme color from DB:", result[0].themeColor);
                setSelectedColor(result[0].themeColor);
                setResumeInfo(prev => ({ ...prev, themeColor: result[0].themeColor }));
            }
        } catch (error) {
            console.error("❌ Error fetching theme color:", error);
        }
    };

    // const updateThemeColor = async (color) => {
    //     console.log("🎨 Selected Color:", color);
    //     console.log("📌 Resume ID:", resumeId);
    
    //     if (!resumeId) {
    //         console.error("❌ Cannot update theme color: resumeId is missing!");
    //         return;
    //     }
    
    //     try {
    //         // Check current theme color in the database before updating
    //         const beforeUpdate = await db
    //             .select({ themeColor: resumes.themeColor })
    //             .from(resumes)
    //             .where(eq(resumes.resumeId, resumeId));
    
    //         console.log("🔍 Current theme color in DB:", beforeUpdate);
    
    //         // Perform the update query
    //         const updated = await db
    //             .update(resumes)
    //             .set({ themeColor: color })
    //             .where(eq(resumes.resumeId, resumeId))
    //             .returning();
    
    //         console.log("✅ Database update response:", updated);
    
    //         // Check the updated theme color in the database
    //         const afterUpdate = await db
    //             .select({ themeColor: resumes.themeColor })
    //             .from(resumes)
    //             .where(eq(resumes.resumeId, resumeId));
    
    //         console.log("🎨 Updated theme color in DB:", afterUpdate);
    //     } catch (error) {
    //         console.error("❌ Error updating theme color:", error);
    //     }
    // };

    const updateThemeColor = async (color) => {
    console.log("🎨 Selected Color:", color);
    console.log("📌 Resume ID:", resumeId);

    if (!resumeId) {
        console.error("❌ Cannot update theme color: resumeId is missing!");
        return;
    }

    try {
        const updated = await db
            .update(resumes)
            .set({ themeColor: color })
            .where(eq(resumes.resumeId, resumeId))
            .returning();

        console.log("✅ Database update response:", updated);

        // ✅ Update local state and context
        setSelectedColor(color);
        setResumeInfo((prev) => ({ ...prev, themeColor: color }));
    } catch (error) {
        console.error("❌ Error updating theme color:", error);
    }
};

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-2">
                    <LayoutGrid /> Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="grid grid-cols-5 gap-2">
                    {colors.map((item) => (
                        <div
                            key={item}
                            onClick={() => updateThemeColor(item)}
                            className={`h-5 w-5 rounded-full cursor-pointer border hover:border-black 
                                ${selectedColor === item ? "border-black" : ""}`}
                            style={{ background: item }}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ThemeColor;
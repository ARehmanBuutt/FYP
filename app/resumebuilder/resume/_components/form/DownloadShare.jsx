"use client";
import React from "react";
import { Button } from "../../../../../components/ui/button";

const HandleDownload = () => {
    window.print()
}

const DownloadShare = () => {
    return (
        <div id="no-print" className="mt-20 text-center text-sm font-medium">
            <h2 className="text-center text-2xl font-medium">
                Congrats! Your Ultimate AI-generated Resume is ready!
            </h2>
            <p className="text-center text-gray-400">
                Now you can download your resume or share your unique resume URL.
            </p>
            <div className="flex justify-center gap-5">
                <Button onClick={HandleDownload} className="mt-10">Download Resume</Button>

                <Button className="mt-10">Share Resume</Button>

            </div>
        </div>
    );
};

export default DownloadShare;
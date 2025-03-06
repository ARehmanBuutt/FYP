"use client";
import React from "react";
import { Button } from "../../../../../components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const downloadResume = async () => {
    const resume = document.getElementById("resume-preview");
    if (!resume) {
        console.error("❌ Resume preview not found.");
        return;
    }

    try {
        const canvas = await html2canvas(resume, {
            scale: 2, // Higher scale for better quality
            useCORS: true, // Ensures external images are included
            scrollY: -window.scrollY, // Captures content even if it's scrolled
            windowWidth: document.documentElement.offsetWidth, // Ensures full width
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

        if (imgHeight <= 297) {
            // If the content fits within one page
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        } else {
            // If the content is longer than one page, split it
            let yPosition = 0;
            const pageHeight = 297; // A4 height in mm

            while (yPosition < imgHeight) {
                pdf.addImage(imgData, "PNG", 0, -yPosition, imgWidth, imgHeight);
                yPosition += pageHeight;
                if (yPosition < imgHeight) pdf.addPage();
            }
        }

        pdf.save("Resume.pdf");
    } catch (error) {
        console.error("❌ Error downloading resume:", error);
    }
};

const DownloadShare = () => {
    return (
        <div className="mt-20 text-center text-sm font-medium">
            <h2 className="text-center text-2xl font-medium">
                Congrats! Your Ultimate AI-generated Resume is ready!
            </h2>
            <p className="text-center text-gray-400">
                Now you can download your resume or share your unique resume URL.
            </p>
            <div className="flex justify-center gap-5">
                <Button onClick={downloadResume} className="mt-10">Download Resume</Button>
                <Button className="mt-10">Share Resume</Button>
            </div>
        </div>
    );
};

export default DownloadShare;


// "use client";
// import React, { useState } from "react";
// import { Button } from "../../../../../components/ui/button";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import htmlDocx from "html-docx-js";

// const DownloadShare = () => {
//     const [format, setFormat] = useState("pdf"); // Default format is PDF

//     // Function to download as PDF
//     const downloadAsPDF = async () => {
//         const resume = document.getElementById("resume-preview");
//         if (!resume) {
//             console.error("❌ Resume preview not found.");
//             return;
//         }

//         try {
//             const canvas = await html2canvas(resume, {
//                 scale: 2,
//                 useCORS: true,
//                 scrollY: -window.scrollY,
//                 windowWidth: document.documentElement.offsetWidth,
//             });

//             const imgData = canvas.toDataURL("image/png");
//             const pdf = new jsPDF("p", "mm", "a4");
//             const imgWidth = 210;
//             const imgHeight = (canvas.height * imgWidth) / canvas.width;

//             if (imgHeight <= 297) {
//                 pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//             } else {
//                 let yPosition = 0;
//                 const pageHeight = 297;

//                 while (yPosition < imgHeight) {
//                     pdf.addImage(imgData, "PNG", 0, -yPosition, imgWidth, imgHeight);
//                     yPosition += pageHeight;
//                     if (yPosition < imgHeight) pdf.addPage();
//                 }
//             }

//             pdf.save("Resume.pdf");
//         } catch (error) {
//             console.error("❌ Error downloading resume as PDF:", error);
//         }
//     };

//     // Function to download as Word (DOCX)
//     const downloadAsWord = () => {
//         const resume = document.getElementById("resume-preview");
//         if (!resume) {
//             console.error("❌ Resume preview not found.");
//             return;
//         }

//         const content = `<html><body>${resume.innerHTML}</body></html>`;
//         const blob = htmlDocx.asBlob(content);
//         const link = document.createElement("a");

//         link.href = URL.createObjectURL(blob);
//         link.download = "Resume.docx";
//         link.click();

//         URL.revokeObjectURL(link.href);
//     };

//     // Handle download based on selected format
//     const handleDownload = () => {
//         if (format === "pdf") {
//             downloadAsPDF();
//         } else if (format === "word") {
//             downloadAsWord();
//         }
//     };

//     return (
//         <div className="mt-20 text-center text-sm font-medium">
//             <h2 className="text-center text-2xl font-medium">
//                 Congrats! Your Ultimate AI-generated Resume is ready!
//             </h2>
//             <p className="text-center text-gray-400">
//                 Now you can download your resume or share your unique resume URL.
//             </p>

//             {/* Format Selection Dropdown */}
//             <div className="mt-5 flex justify-center gap-5">
//                 <select
//                     value={format}
//                     onChange={(e) => setFormat(e.target.value)}
//                     className="border border-gray-300 rounded-md px-4 py-2"
//                 >
//                     <option value="pdf">PDF</option>
//                     <option value="word">Word (.docx)</option>
//                 </select>

//                 {/* Download Button */}
//                 <Button onClick={handleDownload} className="mt-10">
//                     Download
//                 </Button>

//                 {/* Share Button (Placeholder) */}
//                 <Button className="mt-10">Share</Button>
//             </div>
//         </div>
//     );
// };

// export default DownloadShare;
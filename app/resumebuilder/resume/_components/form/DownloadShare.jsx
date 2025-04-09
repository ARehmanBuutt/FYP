"use client";
import React from "react";
import { Button } from "../../../../../components/ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// import { RWebShare } from "react-web-share";

// const downloadResume = async () => {
//     const resume = document.getElementById("resume-preview");
//     if (!resume) {
//         console.error("❌ Resume preview not found.");
//         return;
//     }

//     try {
//         const canvas = await html2canvas(resume, {
//             scale: 2, // Higher scale for better quality
//             useCORS: true, // Ensures external images are included
//             scrollY: -window.scrollY, // Captures content even if it's scrolled
//             windowWidth: document.documentElement.offsetWidth, // Ensures full width
//         });

//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");

//         const imgWidth = 210; // A4 width in mm
//         const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

//         if (imgHeight <= 297) {
//             // If the content fits within one page
//             pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//         } else {
//             // If the content is longer than one page, split it
//             let yPosition = 0;
//             const pageHeight = 297; // A4 height in mm

//             while (yPosition < imgHeight) {
//                 pdf.addImage(imgData, "PNG", 0, -yPosition, imgWidth, imgHeight);
//                 yPosition += pageHeight;
//                 if (yPosition < imgHeight) pdf.addPage();
//             }
//         }

//         pdf.save("Resume.pdf");
//     } catch (error) {
//         console.error("❌ Error downloading resume:", error);
//     }
// };

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

                {/* <RWebShare
                    data={{
                        text: "HI, Everyone!",
                        url: "https://on.natgeo.com/2zHaNup",
                        title: "Flamingos",
                    }}
                    onClick={() => console.log("shared successfully!")}>
                </RWebShare> */}
                    <Button className="mt-10">Share Resume</Button>

            </div>
        </div>
    );
};

export default DownloadShare;


// "use client";
// import React from "react";
// import { Button } from "../../../../../components/ui/button";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";  

// const HandleDownload = async () => {
//     const resume = document.getElementById("resume-preview");
//     if (!resume) {
//         console.error("❌ Resume preview not found.");
//         return;
//     }

//     try {
//         const canvas = await html2canvas(resume, {
//             scale: 2, // Higher scale for better quality
//             useCORS: true, // Ensures external images are included
//             backgroundColor: null, // Keeps transparent backgrounds
//             scrollY: -window.scrollY, // Captures full resume even if scrolled
//         });

//         const imgData = canvas.toDataURL("image/png");
//         const pdf = new jsPDF("p", "mm", "a4");

//         const imgWidth = 210; // A4 width in mm
//         const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

//         pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//         pdf.save("Resume.pdf");
//     } catch (error) {
//         console.error("❌ Error downloading resume:", error);
//     }
// };

// const DownloadShare = () => {
//     return (
//         <div id="no-print" className="mt-20 text-center text-sm font-medium">
//             <h2 className="text-center text-2xl font-medium">
//                 Congrats! Your Ultimate AI-generated Resume is ready!
//             </h2>
//             <p className="text-center text-gray-400">
//                 Now you can download your resume or share your unique resume URL.
//             </p>
//             <div className="flex justify-center gap-5">
//                 <Button onClick={HandleDownload} className="mt-10">Download Resume</Button>
//                 <Button className="mt-10">Share Resume</Button>
//             </div>
//         </div>
//     );
// };

// export default DownloadShare;
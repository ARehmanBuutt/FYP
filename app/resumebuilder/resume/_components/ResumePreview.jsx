import { ResumeInfoContext } from '../../../../app/context/ResumeInfoContext';
import React, { useContext } from 'react';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';

const ResumePreview = () => {
    const { resumeInfo } = useContext(ResumeInfoContext);

    return (
        <div
            // id="resume-preview" // ✅ Added this ID for PDF download
            id='print-area'
            className="bg-white p-5 shadow-md rounded-lg border-t-[20px]"
            style={{
                borderColor: resumeInfo?.themeColor,
            }}
        >
            {/* Personal Details */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />

            {/* Summary */}
            <SummaryPreview resumeInfo={resumeInfo} />

            {/* Professional Experience */}
            <ExperiencePreview resumeInfo={resumeInfo} />

            {/* Education */}
            <EducationalPreview resumeInfo={resumeInfo} />

            {/* Skills */}
            <SkillsPreview resumeInfo={resumeInfo} />
        </div>
    );
};

export default ResumePreview;
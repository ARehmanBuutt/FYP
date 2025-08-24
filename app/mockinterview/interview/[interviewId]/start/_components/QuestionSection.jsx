// import { Lightbulb, Volume2 } from 'lucide-react'
// import React from 'react'

// const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) => {

//   const textToSpeech = (text) => {
//     if ("speechSynthesis" in window) {
//       const speech = new SpeechSynthesisUtterance(text);
//       window.speechSynthesis.speak(speech);
//     } else {
//       alert("Sorry, your browser does not support text to speech.");
//     }
//   };

//   return (
//     mockInterviewQuestion && (
//       <div className=" flex flex-col justify-between p-5 border rounded-lg my-1 bg-secondary">
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">

//           {mockInterviewQuestion &&
//             mockInterviewQuestion.map((question, index) => (
//               <h2
//                 className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer md:block hidden 
//                         ${activeQuestionIndex == index
//                     ? "bg-black text-white"
//                     : "bg-secondary"
//                   }`}
//               >
//                 Question #{index + 1}
//               </h2>
//             ))}
//         </div>
//         <h2 className='my-5 text-md md:text-lg'>
//           {mockInterviewQuestion[activeQuestionIndex]?.question}
//         </h2>


//         <Volume2
//           className="cursor-pointer"
//           onClick={() =>
//             textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
//           }
//         />

//         <div className='border rounded-lg p-5 bg-blue-100 mt-20 md:block hidden'>
//           <h2 className='flex gap-2 items-center text-blue-800'>
//             <Lightbulb />
//             <strong>Note:</strong>
//           </h2>
//           <h2 className='text-sm text-primary my-2'>
//             {process.env.NEXT_PUBLIC_QUESTION_NOTE}
//           </h2>
//         </div>

//       </div>
//     )
//   )
// }

// export default QuestionSection;


import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionSection = ({ mockInterviewQuestion, activeQuestionIndex, setActiveQuestionIndex }) => {

  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Sorry, your browser does not support text to speech.");
    }
  };

  return (
    mockInterviewQuestion && (
      // <div className="flex flex-col justify-between p-5 border rounded-lg my-1 bg-secondary h-full">
      <div className="flex flex-col justify-between p-5 border rounded-lg my-1 bg-secondary h-[400px] md:h-full">
        {/* Question Index Pills - visible on all devices */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`px-3 py-1 rounded-full text-xs md:text-sm text-center cursor-pointer
                ${activeQuestionIndex === index
                  ? "bg-black text-white"
                  : "bg-gray-200"
                }`}
              onClick={() => setActiveQuestionIndex(index)}
            >
              Que:{index + 1}
            </h2>
          ))}
        </div>

        {/* Question */}
        <h2 className="my-5 text-md md:text-lg text-center md:text-left">
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </h2>

        {/* TTS Button */}
        <div className="flex justify-center md:justify-start">
          <Volume2
            className="cursor-pointer"
            onClick={() =>
              textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
            }
          />
        </div>

        {/* Note Section - visible on all devices but smaller on mobile */}
        <div className="border rounded-lg p-3 md:p-5 bg-blue-100 mt-6">
          <h2 className="flex gap-2 items-center text-blue-800">
            <Lightbulb className="w-4 h-4 md:w-5 md:h-5" />
            <strong>Note:</strong>
          </h2>
          <h2 className="text-xs md:text-sm text-primary my-2">
            {process.env.NEXT_PUBLIC_QUESTION_NOTE}
          </h2>
        </div>
      </div>
    )
  )
}

export default QuestionSection
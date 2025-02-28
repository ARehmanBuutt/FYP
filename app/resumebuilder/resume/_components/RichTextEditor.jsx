"use client"
import React, { useContext, useState } from 'react'
import { BtnBold, BtnBulletList, BtnClearFormatting, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnStyles, BtnUnderline, Editor, EditorProvider, HtmlButton, Separator, Toolbar } from 'react-simple-wysiwyg'
import { Button } from '../../../../components/ui/button'
import { Brain, LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '../../../context/ResumeInfoContext'
import { toast } from 'sonner'
import { chatSession } from '../../../../utils/GeminiAIModal'

const prompt = "position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags"

const RichTextEditor = ({ onRichTextEditorChange, index }) => {
  const [value, setValue] = useState()

  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);
  const [loading, setLoading] = useState(false)

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)

  const generateSummaryFromAI = async () => {
    setLoading(true);

    if (!resumeInfo.experience[index].title) {
      toast("Please add a position title");
      setLoading(false);
      return;
    }

    const PROMPT = prompt.replace("{positionTitle}", resumeInfo.experience[index].title);

    try {
      const result = await chatSession.sendMessage(PROMPT);
      let responseText = await result.response.text(); // Await the text response
      console.log("📌 Raw AI Response:", responseText);

      // Clean up AI response if it contains unwanted markdown ```html
      responseText = responseText.replace(/```html|```/g, "").trim();

      // Store plain HTML
      setValue(responseText);
      setAiGeneratedSummaryList([responseText]);

      console.log("✅ AI Generated Summary:", responseText);
    } catch (error) {
      console.error("❌ AI Generation Error:", error);
      toast.error("Error generating AI suggestions");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button variant="outline" size="sm"
          onClick={generateSummaryFromAI}
          className="flex gap-2 border-primary text-primary">
          {loading ?
            <LoaderCircle className='animate-spin' /> :
            <>
              <Brain className='h-4 w-4' />Generate from AI
            </>
          }
        </Button>
      </div>
      <EditorProvider>
        <Editor value={value} onChange={(e) => {
          setValue(e.target.value)
          onRichTextEditorChange(e)
        }}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />

          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor
import { db } from "../../../../utils/db"
import { prepInterview } from "../../../../utils/schema"
import { eq } from "drizzle-orm"

export default async function PrepPage({ params }) {
  const { prepId } = params

  const rows = await db
    .select()
    .from(prepInterview)
    .where(eq(prepInterview.prepId, prepId))

  if (!rows.length) {
    return <div className="p-6">Prep set not found.</div>
  }

  const prep = rows[0]

  let qa = []
  try {
    qa = JSON.parse(prep.jsonPrepResp)
  } catch {
    // leave qa empty; fallback below
  }

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-center text-primary">Interview Prepration Q/A : {prep.jobTitle}</h1>

      <div className="space-y-5">
        {qa.length > 0 ? (
          qa.map((item, i) => (
            <div
              key={i}
              className="p-5 rounded-xl border border-muted shadow-sm bg-secondary/50"
            >
              <h3 className="text-lg font-semibold text-blue-700">
                {i + 1}. {item.question}
              </h3>
              <p className="mt-3 text-sm text-green-800 whitespace-pre-line">
                <span className="font-medium">Answer:</span> {item.answer}
              </p>
            </div>
          ))
        ) : (
          <pre className="text-sm whitespace-pre-wrap break-words bg-muted/50 p-4 rounded-md border">
            {prep.jsonPrepResp}
          </pre>
        )}
      </div>
    </div>
  )
}
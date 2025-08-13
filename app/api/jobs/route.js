import { currentUser } from "@clerk/nextjs/server";
import { db } from "../../../utils/db";
import { resumes } from "../../../utils/schema";
import { eq } from "drizzle-orm";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || "";
  const page = searchParams.get("page") || "1";

  try {
    // Get current logged-in user
    const user = await currentUser();
    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userEmail = user.emailAddresses[0].emailAddress;

    // Fetch resumes from DB for this user
    const userResumes = await db
      .select()
      .from(resumes)
      .where(eq(resumes.userEmail, userEmail));

    let jobs = [];

    if (query) {
      // Fetch jobs from JSearch
      const res = await fetch(
        `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=${page}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`JSearch API error: ${res.status}`);
      }

      const data = await res.json();
      jobs = data.data || [];
    }

    return new Response(
      JSON.stringify({
        resumes: userResumes,
        jobs: jobs,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching jobs/resumes:", error);
    return new Response("Failed to fetch jobs and resumes", { status: 500 });
  }
}
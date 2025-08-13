export async function fetchJobs(query, location) {
  // location is either "" (all Pakistan) or a city name like "Lahore"
  const rapidApiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  if (!rapidApiKey) throw new Error("Missing JSearch API key");

  const city = (location || "").trim(); // "" => all Pakistan
  const country = "Pakistan";

  // Build a broad search; we'll strictly filter client-side by city
  const searchQuery = city
    ? `${query} in ${city}, ${country}`
    : `${query} in ${country}`;

  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(searchQuery)}&page=1&num_pages=1`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": rapidApiKey,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
      // prevent caching during dev
      cache: "no-store",
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("JSearch API error:", res.status, body);
      return [];
    }

    const data = await res.json();
    let list = data?.data || [];

    // 🔒 Strict city filter when user picked a city
    if (city) {
      const want = city.toLowerCase();
      list = list.filter(j => {
        const c1 = (j.job_city || "").toLowerCase();
        const c2 = (j.job_location || "").toLowerCase();
        // prefer exact job_city match; fallback to includes on job_location text
        return c1 === want || c2.split(",")[0].trim().toLowerCase() === want;
      });
    }

    return list;
  } catch (err) {
    console.error("fetchJobs error:", err);
    return [];
  }
}
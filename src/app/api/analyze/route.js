import { NextResponse } from "next/server";
import { getSpotifyToken } from "@/lib/spotify";
import Groq from "groq-sdk";

//fetching artists data
async function getArtistData(name, token) {
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=artist&limit=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const text = await res.text();
  let data;

  try {
    data = JSON.parse(text);
  } catch {
    console.error("Artist error:", text);
    return null;
  }

  const artist = data.artists?.items[0];
  if (!artist) return null;

  return {
    name: artist.name,
    genres: artist.genres || [],
    popularity: 50, // default value since popularity was deprecated for artists
  };
}

// fetching tracks data
async function getTrackData(name, token) {
  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(name)}&type=track&limit=1`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const text = await res.text();
  let data;

  try {
    data = JSON.parse(text);
  } catch {
    console.error("Track error:", text);
    return null;
  }

  const track = data.tracks?.items[0];
  if (!track) return null;

  let genres = [];

  try {
    const artistId = track.artists[0]?.id;
    const artistRes = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const artistText = await artistRes.text();
    const artistData = JSON.parse(artistText);
    genres = artistData.genres || [];
  } catch {
    console.error("Artist fetch failed");
  }

  return {
    name: track.name,
    genres,
    popularity: track.popularity ?? 50,
  };
}

// calculate uniqueness score based on popularity and genre 
function calculateUniqueness(dataArray) {
  const valid = dataArray.filter(Boolean);
  if (valid.length === 0) return null;

  // Avg popularity
  const pops = valid.map((d) => d.popularity ?? 50);
  const avgPop =
    pops.reduce((a, b) => a + b, 0) / pops.length;

  // Genre 
  const allGenres = valid.flatMap((d) => d.genres || []);
  const uniqueGenres = [...new Set(allGenres)];

  const diversityScore = Math.min(uniqueGenres.length * 10, 100);

  // Final uniqueness
  const uniqueness = Math.round(
    (100 - avgPop) * 0.7 + diversityScore * 0.3
  );

  return {
    genres: uniqueGenres.slice(0, 6),
    uniqueness,
  };
}

// groq personality generation
async function generatePersonality(features) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: `You are a savage but funny music personality analyst.

          You are analyzing someone's music taste based on:
          - Genres
          - A uniqueness score (0–100)

          Your goal:
          Describe the PERSON behind the music.

          STYLE:
          - Slightly savage, witty, and bold
          - Like a TikTok roast or Spotify Wrapped personality
          - Talk directly to the user ("You are the type of person who...")

          INTERPRETATION:
          - 70–100 → very unique, niche, "you think you're different"
          - 40–69 → balanced, adaptable taste
          - 0–39 → mainstream, trend follower

          OUTPUT STRICT JSON:

          {
            "persona": "funny 3-4 word title",
            "description": "2-3 sentences, playful and slightly savage",
            "tags": ["4 personality traits"]
          }

          Data:
          - Genres: ${features.genres.length ? features.genres.join(", ") : "mixed"}
          - Uniqueness Score: ${features.uniqueness}
`
      }
    ]
  });

  const text = completion.choices[0].message.content.trim();
  const clean = text.replace(/```json|```/g, "").trim();

  try {
    return JSON.parse(clean);
  } catch {
    return {
      persona: "Mysterious Listener",
      description: "Your taste is chaotic and impossible to decode.",
      tags: ["random", "unpredictable"]
    };
  }
}

//api route handler
export async function POST(request) {
  try {
    const { mode, entries } = await request.json();

    if (!entries || entries.length === 0) {
      return NextResponse.json({ error: "No entries provided" }, { status: 400 });
    }

    const token = await getSpotifyToken();

    const rawData = await Promise.all(
      entries.map((entry) =>
        mode === "artists"
          ? getArtistData(entry, token)
          : getTrackData(entry, token)
      )
    );
  

    const features = calculateUniqueness(rawData);

    if (!features) {
      return NextResponse.json(
        { error: "No valid data found." },
        { status: 404 }
      );
    }

    const personality = await generatePersonality(features);

    return NextResponse.json({
      personality,
      features,
      entries: rawData.filter(Boolean).map((d) => d.name),
    });

  } catch (error) {
    console.error("Analyze error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
export async function getSpotifyToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  const data = await res.json();
  return data.access_token;
}
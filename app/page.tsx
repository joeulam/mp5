'use client';
import { useState } from "react";
import { Box, Button, Input } from "@mui/material";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [alis, setAlis] = useState("")
  const [error, setError] = useState("");

  async function handleShorten() {
    try{
      new URL(url);
    } catch{
      setError("Please enter a valid URL.");
      return;
    }
    if (!url) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const response = await fetch(`/api/getRoute?shortenUrl=${(url)}&alis=${(alis)}`);
      const res = await response.json();

      if (!res.isUnique) {
        setError("This URL has already been shortened.");
        setShortenedUrl("");
      } else {
        const shortened = `${process.env.NEXT_PUBLIC_BASEURL}${alis}`;
        setShortenedUrl(shortened);
        setError("");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Welcome to the URL shortener</h1>
      <Input
        placeholder="Insert your URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
      />
      <Input
        placeholder="Insert your alis"
        value={alis}
        onChange={(e) => setAlis(e.target.value)}
        fullWidth
      />
      <Button onClick={handleShorten} variant="contained">
        Shorten
      </Button>
      <Box>
        {error ? (
          <span style={{ color: "red" }}>{error}</span>
        ) : (
          shortenedUrl && (
            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
              This is your shortened URL: {shortenedUrl}
            </a>
          )
        )}
      </Box>
    </div>
  );
}

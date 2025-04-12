"use client";
import { useState } from "react";
import { Box, Button, Input } from "@mui/material";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [alis, setAlis] = useState("");
  const [error, setError] = useState("");

  async function handleShorten() {
    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL.");
      return;
    }
    if (!url) {
      setError("Please enter a URL.");
      return;
    }

    try {
      const response = await fetch(
        `/api/getRoute?shortenUrl=${url}&alis=${alis}`
      );
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
    <div className="w-[80vw] m-auto p-20">
      <div className="border-3 rounded-2xl grid place-items-center p-30">
        <h1 className="text-2xl font-bold">Welcome to the URL shortener</h1>
        <Input
          className="m-5"
          placeholder="Insert your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          fullWidth
        />
        <Input
          className="m-5"
          placeholder="Insert your alis"
          value={alis}
          onChange={(e) => setAlis(e.target.value)}
          fullWidth
        />
        <Button onClick={handleShorten} variant="contained" className="mt-5">
          Shorten
        </Button>
        <Box className="mt-10">
          {error ? (
            <span className="text-red-500">{error}</span>
          ) : (
            shortenedUrl && (
              <a href={shortenedUrl} target="_blank">
                This is your shortened URL: {shortenedUrl}
              </a>
            )
          )}
        </Box>
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Route() {
  const { slug } = useParams();
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function handleRedirect() {
      try {
        const response = await fetch(`/api/getUrl?alis=${slug}`);
        const res = await response.json();
        if (response.status == 404) {
          throw new Error("THIS URL DOES NOT EXIST");
        }
        if (res?.url) {
          router.push(res.url);
        }
      } catch (err) {
        console.error("error" + err);
        setError(true);
      }
    }
    handleRedirect();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold text-center">
          This shortened URL doesn&apos;t exist.
        </h1>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-xl font-semibold text-center">Redirecting...</h1>
      </div>
    );
  }
}

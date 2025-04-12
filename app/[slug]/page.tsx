'use client';
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function Route() {
  const {slug} = useParams()
  const router = useRouter();
  useEffect(() => {
    async function handleRedirect() {
      try {
        const response = await fetch(`/api/getUrl?alis=${slug}`);
        const res = await response.json();

        if (res?.url) {
          router.push(res.url);
        }
      } catch (err) {
        console.error("error"+err);
      }
    }

    handleRedirect();
  }, []);

  return <p>Redirecting...</p>;
}

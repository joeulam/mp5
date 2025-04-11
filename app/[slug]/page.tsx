'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Route({ params }: { params: { slug: string } }) {
  const router = useRouter();
  useEffect(() => {
    async function handleRedirect() {
      try {
        const response = await fetch(`/api/getUrl?alis=${params.slug}`);
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

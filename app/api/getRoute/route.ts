import getCollection, { POSTS_COLLECTION } from "@/db";

export async function GET(
  request: Request,
) {
  const { searchParams } = new URL(request.url);
  const shortenUrl = searchParams.get("shortenUrl");
  const alis = searchParams.get("alis");

  if (!shortenUrl) {
    return new Response(JSON.stringify({ error: "URL CANNOT BE BLANK" }), {
      status: 400,
    });
  }

  const postsCollection = await getCollection(POSTS_COLLECTION);
  const existingEntry = await postsCollection.findOne({ alis: alis });
  if(existingEntry == null){
    const nonExistingEntry = await postsCollection.insertOne({ alis: alis, url: shortenUrl });
    return new Response(
      JSON.stringify({ isUnique: nonExistingEntry }),
      {
        status: 200,
      }
    );
  }

  return new Response(
    JSON.stringify({ isUnique: existingEntry }),
    {
      status: 200,
    }
  );
}

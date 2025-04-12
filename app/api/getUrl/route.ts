import getCollection, { POSTS_COLLECTION } from "@/db";

export async function GET(
  request: Request,
) {
  const { searchParams } = new URL(request.url);
  const alis = searchParams.get("alis");
  const postsCollection = await getCollection(POSTS_COLLECTION);
  const existingEntry = await postsCollection.findOne({ alis: alis });
  console.log(existingEntry)
  if(existingEntry == null){
    return new Response(
      JSON.stringify({ text: "The shorten url doesnt not exist" }),
      {
        status: 404,
      }
    );
  }

  return new Response(
    JSON.stringify({ url: existingEntry.url }),
    {
      status: 200,
    }
  );
}

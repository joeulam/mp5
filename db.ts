import { MongoClient, Db, Collection } from "mongodb";

const MONGO_URI = process.env.MONGO_URI as string

const DB_NAME = "mp5Url";
export const POSTS_COLLECTION = "posts-collection";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db>{
  if(!client){
    client = new MongoClient(MONGO_URI);
    await client.connect();
  }
  return client.db(DB_NAME);
}

export default async function getCollection(collectionName:string): Promise<Collection> {
  if(!db){
    db = await connect()
  }
  return db.collection(collectionName)
}
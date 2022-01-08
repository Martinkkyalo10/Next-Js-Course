import { MongoClient } from "mongodb";

export async function connectDatabase() {
  // set up mongodb connection
  const client = await MongoClient.connect(
    "mongodb+srv://eventapp123:Drbrand2020@cluster0.a2igt.mongodb.net/eventapp?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();
  const documents = await db.collection(collection).find().sort(sort).toArray();
  return documents;
}

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    // extract data
    const userEmail = req.body.email;

    //   validate email
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    // set up mongodb connection
    const client = await MongoClient.connect(
      "mongodb+srv://eventapp123:Drbrand2020@cluster0.a2igt.mongodb.net/eventapp?retryWrites=true&w=majority"
    );
    const db = client.db();

    await db.collection("newsletter").insertOne({ email: userEmail });

    client.close();
    //   send response to the client
    res.status(201).json({ message: "Signed up successfully" });
  }
}

export default handler;

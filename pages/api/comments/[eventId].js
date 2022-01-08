export default async function handler(req, res) {
  const eventId = req.query.eventId;

  // set up mongodb connection
  const client = await MongoClient.connect(
    "mongodb+srv://eventapp123:Drbrand2020@cluster0.a2igt.mongodb.net/eventapp?retryWrites=true&w=majority"
  );

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    // add server side validaton
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    //   construct a new object for saving in the database
    const newComment = {
      email,
      name,
      text,
      eventId,
    };
    const db = client.db();

    const result = await db.collection("comments").insertOne(newComment);

    console.log(result);

    newComment.id = result.insertedId;
    res.status(201).json({ message: "Added comment.", comment: newComment });
  }
  if (req.method === "Get") {
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: documents });
  }
  client.close();
}

export default function handler(req, res) {
  const eventId = req.query.eventId;
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
      id: eventId,
      email,
      name,
      text,
    };
    console.log(newComment);
    res.status(201).json({ message: "Added comment.", comment: newComment });
  }
  if (req.method === "Get") {
    const dummyList = [
      { id: "a1", name: "Martin", text: "my first comment" },
      { id: "a2", name: "Kyalo", text: "my second comment." },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

function handler(req, res) {
  if (req.method === "POST") {
    // extract data
    const userEmail = req.body.email;

    //   validate email
    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    //   store user email
    console.log(userEmail);
    //   send response to the client
    res.status(201).json({ message: "Signed up successfully" });
  }
}

export default handler;

import { MongoClient } from "mongodb";
// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { address, description, image, title } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://mnelyubin:1804@cluster0.yrunn.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: "Meetup has been inserted" });
  }
}

export default handler;

import { MongoClient } from "mongodb";
// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_LOGIN}:${process.env.NEXT_PUBLIC_MONGO_PASSWORD}@cluster0.yrunn.mongodb.net/meetups?retryWrites=true&w=majority`
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

import { MongoClient } from "mongodb";

export async function getMeetups() {
  const client = await MongoClient.connect(
    "mongodb+srv://mnelyubin:1804@cluster0.yrunn.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return meetups;
}

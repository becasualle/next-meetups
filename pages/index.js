import MeetupList from "../components/meetups/MeetupList";
// import { getMeetups } from "../helpers/collections";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  // fetch data from an API or filesystem
  // run while building process and each time we revalidate

  const client = await MongoClient.connect(
    "mongodb+srv://mnelyubin:1804@cluster0.yrunn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  // const meetups = await getMeetups();

  const formattedMeetups = meetups.map((meetup) => {
    meetup.id = meetup._id.toString();
    delete meetup._id;
    return meetup;
  });

  return {
    props: {
      meetups: formattedMeetups,
    },
    revalidate: 3600,
  };
}

export default HomePage;

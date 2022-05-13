import MeetupList from "../components/meetups/MeetupList";
// import { getMeetups } from "../helpers/collections";
import { MongoClient } from "mongodb";

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
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
    revalidate: 10,
  };
}

export default HomePage;

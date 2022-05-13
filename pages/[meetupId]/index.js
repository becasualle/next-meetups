import { useRouter } from "next/router";
import Head from "next/head";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
const MeetupDetails = ({ meetupData }) => {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail meetupData={meetupData} />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_LOGIN}:${process.env.NEXT_PUBLIC_MONGO_PASSWORD}@cluster0.yrunn.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  // return only id field
  const meetupsIds = await meetupsCollection
    .find()
    .project({ _id: 1 })
    .toArray();

  client.close();

  return {
    // false когда указали все пути (404 ошибка если пользователь введет что-то иное), true когда часть (будет пытаться сгенерировать page для нового id, динамически на сервере для входящего запроса)
    fallback: "blocking",
    // генерируем объект с параметрами, внутри которых указываем сегмент динамических id и конкретные id для которых делаем пре-генерацию страницы
    paths: meetupsIds.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.NEXT_PUBLIC_MONGO_LOGIN}:${process.env.NEXT_PUBLIC_MONGO_PASSWORD}@cluster0.yrunn.mongodb.net/meetups?retryWrites=true&w=majority`
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  const formattedMeetup = { ...meetup, id: meetup._id.toString() };
  delete formattedMeetup._id;
  client.close();

  return {
    props: {
      meetupData: formattedMeetup,
    },
  };
}

export default MeetupDetails;

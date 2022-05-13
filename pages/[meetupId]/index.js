import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
const MeetupDetails = ({ meetupData }) => {
  return <MeetupDetail meetupData={meetupData} />;
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mnelyubin:1804@cluster0.yrunn.mongodb.net/meetups?retryWrites=true&w=majority"
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
    fallback: false,
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
  // console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://mnelyubin:1804@cluster0.yrunn.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  // return only id field
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

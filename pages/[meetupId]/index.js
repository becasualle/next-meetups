import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
const MeetupDetails = (props) => {
  // const router = useRouter();
  // const meetupId = router.query.meetupId;
  return <MeetupDetail image={props.meetupData.image} />;
};

export async function getStaticPaths() {
  return {
    // false когда указали все пути (404 ошибка если пользователь введет что-то иное), true когда часть (будет пытаться сгенерировать page для нового id, динамически на сервере для входящего запроса)
    fallback: false,
    // генерируем объект с параметрами, внутри которых указываем сегмент динамических id и конкретные id для которых делаем пре-генерацию страницы
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
      {
        params: {
          meetupId: "m3",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  return {
    props: {
      meetupData: {
        id: meetupId,
        image:
          "https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib: b-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        title: "A First Meetup",
        address: "Some address 5, 12345 Some City",
        description: "The meetup description",
      },
    },
  };
}

export default MeetupDetails;

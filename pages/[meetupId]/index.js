import { useRouter } from "next/router";
import MeetupDetail from "../../components/meetups/MeetupDetail";
const MeetupDetails = () => {
  const router = useRouter();
  const meetupId = router.query.meetupId;
  return (
    <MeetupDetail
      image="https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
      title="A First Meetup"
      address="Some address 5, 12345 Some City"
      description="The meetup description"
    />
  );
};

export default MeetupDetails;

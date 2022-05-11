import classes from "./MeetupDetail.module.css";
const MeetupDetail = ({ meetupData }) => {
  const { id, address, description, image, title } = meetupData;
  return (
    <section className={classes.detail}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
    </section>
  );
};

export default MeetupDetail;

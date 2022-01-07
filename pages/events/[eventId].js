import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert/error-alert";

export default function EventDetailsPage(props) {
  // get event from id when a link is clicked
  const event = props.selectedEvent;

  // validate event
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        umageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    // regenerate page after 30 second to reflect changes since the last request
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    // tell nextjs there are more pages to be generated here. it should generate a page that was not pregenerated before
    // fallback: true,
    fallback: "blocking",
    //  seting fallback  'blocking" prevents next js from serving anything until it is done generating the page
  };
}

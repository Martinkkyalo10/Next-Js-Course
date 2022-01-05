import { Fragment } from "react";
import EventList from "../../components/events/eventList";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data";

export default function AllEventsPage() {
  const events = getAllEvents();
  return (
    <Fragment>
      <EventSearch />
      <EventList items={events} />
    </Fragment>
  );
}

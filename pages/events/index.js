import { Fragment } from "react";
import { useRouter } from "next/router";
import EventList from "../../components/events/eventList";
import EventSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data";

export default function AllEventsPage() {
  const events = getAllEvents();

  const router = useRouter();

  // recieve props from event search component to set up programmatic navigation
  function findEventHandler(year, month) {
    // get full path
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }
  return (
    <Fragment>
      {/* pass findEventHandler to EventSearch Component */}
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

import { useRouter } from "next/router";
import { getFilteredEvents } from "./../../dummy-data";
import EventList from "./../../components/events/eventList";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import { Link } from "next/link";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import ResultsTitle from "../../components/results-title/results-title";

export default function FilteredEventsPage() {
  const router = useRouter();
  // extract data leading to this page from the url using router

  const filterData = router.query.slug;
  // console.log(filterData);
  // validate filter data
  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  // if there is filtered data
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // transform year and month from string to numbers
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // anticipate for when users entered url wrong formatt /events/abc/34/34
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>;
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // if there are filtered events

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  // check if filtered events are faulty or an empty array
  if (!filteredEvents || filteredEvents.lenght === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events found for the selected filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // outputting events
  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

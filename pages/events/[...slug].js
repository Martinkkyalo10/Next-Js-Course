import { useRouter } from "next/router";
import { getFilteredEvents } from "./../../dummy-data";
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
    return <p>Invalid filter. Please adjust your values!</p>;
  }

  // if there are filtered events

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  // check if filtered events are faulty or an empty array
  if (!filteredEvents || filteredEvents.lenght === 0) {
    return <p>No events founds for the selected filter!</p>;
  }

  // outputting events
  return (
    <div>
      <h1>Filtered Events HomePage</h1>
    </div>
  );
}

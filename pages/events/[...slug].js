import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "./../../components/events/eventList";
import { Fragment } from "react";
import Button from "../../components/ui/button";
import { Link } from "next/link";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import ResultsTitle from "../../components/results-title/results-title";

export default function FilteredEventsPage(props) {
  const router = useRouter();
  // extract data leading to this page from the url using router

  // const filterData = router.query.slug;
  // // console.log(filterData);
  // // validate filter data
  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // if there is filtered data
  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // // transform year and month from string to numbers
  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  // anticipate for when users entered url wrong formatt /events/abc/34/34
  if (props.hasError) {
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

  const filteredEvents = props.events;
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
  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// getStaticPros function cannot be used here because the user will enter different combination of parameters which must be used to sort data from the server
// all possible filters are likely to be visited and therefore you cannot predict the exact paths using getStaticPaths function
// getServerSideProps is therefore the most appropriate
export async function getServerSideProps(context) {
  // get params from the context
  const { params } = context;

  // if there is filtered data
  const filterData = params.slug;
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
    // if validation fails
    return {
      props: {
        hasError: true,
      },
      // notFound: true,
      // redirect: {
      //   destination:'/error'
      // }
    };
  }

  // if there are filtered events

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}

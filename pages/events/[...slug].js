import { Fragment, useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "./../../components/events/eventList";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert/error-alert";
import ResultsTitle from "../../components/results-title/results-title";

export default function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  // adding client-side data fetching here is needed to enable user get filtered events quickly
  // extract data leading to this page from the url using router

  const filterData = router.query.slug;

  // use useSWR hook to fetch data on client-side

  const { data, error } = useSWR(
    "https://next-meetups-project-default-rtdb.firebaseio.com/events.json"
  );

  useEffect(() => {
    if (data) {
      // transform data
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  // console.log(filterData);
  // validate filter data
  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  // if there is filtered data
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // transform year and month from string to numbers
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // filter events

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  // anticipate for when users entered url wrong formatt /events/abc/34/34
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
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
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${numMonth}/${numYear}.`}
        />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// getStaticPros function cannot be used here because the user will enter different combination of parameters which must be used to sort data from the server
// all possible filters are likely to be visited and therefore you cannot predict the exact paths using getStaticPaths function
// getServerSideProps is therefore the most appropriate
// SSR and client-side data fetching should not be used together unless you are interest in request headers because you already have upto date data
// export async function getServerSideProps(context) {
//   // get params from the context
//   const { params } = context;

//   // if there is filtered data
//   const filterData = params.slug;
//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   // transform year and month from string to numbers
//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   // anticipate for when users entered url wrong formatt /events/abc/34/34
//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     // if validation fails
//     return {
//       props: {
//         hasError: true,
//       },
//       // notFound: true,
//       // redirect: {
//       //   destination:'/error'
//       // }
//     };
//   }

//   // if there are filtered events

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

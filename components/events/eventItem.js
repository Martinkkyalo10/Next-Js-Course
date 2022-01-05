import React from "react";
import Link from "next/link";
import classes from "./eventItem.module.css";

export default function EventItem(props) {
  const { title, image, date, location, id } = props;
  const humanRedableDate = new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedAddress = location.replace(", ", "\n");

  // link to event details component
  const exploreLink = `/events/${id}`;
  return (
    <li className={classes.item}>
      <img src={"/" + image} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <time>{humanRedableDate} </time>
          </div>
          <div className={classes.address}>
            <address>{formattedAddress} </address>
          </div>
        </div>
        <div className={classes.actions}>
          <Link href={exploreLink}>Explore Event</Link>
        </div>
      </div>
    </li>
  );
}

import React from "react";
import Link from "next/link";
import classes from "./button.module.css";

export default function Button(props) {
  // the link passes a text that is imported from outside components.
  //   the props, children accaptes dynamic values
  if (props.link) {
    return (
      //   the link components is used to prevent
      // brownser default behavior of sending http request when clicked
      <Link href={props.link}>
        {/* the link tag is added to apply custom css style */}
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  }
  return (
    <button className={classes.btn} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

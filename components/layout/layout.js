import React, { Fragment } from "react";

export default function layout(props) {
  return (
    <Fragment>
      <main>{props.children}</main>
    </Fragment>
  );
}

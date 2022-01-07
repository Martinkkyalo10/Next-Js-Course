import Document, { Html, Head, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      // default document structure
      <Html lang="en">
        <Head />
        <body>
          <div id="overlays" />
          {/* this div can be selected using react portal to add html elements outside the application component tree */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

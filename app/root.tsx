import {
  LiveReload,
} from "remix";


export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>
      <body>
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

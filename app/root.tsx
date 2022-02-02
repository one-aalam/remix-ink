import { LiveReload, Outlet } from "remix";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: Engineer modern full-stack apps, joyfully! </title>
      </head>
      <body>
          {/* Container */}
          <Outlet/>
        {process.env.NODE_ENV === "development" ? (
          <LiveReload />
        ) : null}
      </body>
    </html>
  );
}

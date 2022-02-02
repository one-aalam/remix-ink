import { LiveReload, Outlet } from "remix";

import Header from '~/components/Header'
import Nav from '~/components/Nav'
import Footer from '~/components/Footer'

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: Engineer modern full-stack apps, joyfully! </title>
      </head>
      <body>
        <br/>
        <Header/>
        <Nav/>
        <div className="container">
            <Outlet/>
        </div>
        <br/>
        <Footer/>
        {process.env.NODE_ENV === "development" ? (
          <LiveReload />
        ) : null}
      </body>
    </html>
  );
}

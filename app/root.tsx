import { LiveReload, Outlet, LinksFunction, Links } from "remix";

import Header from '~/components/Header'
import Nav from '~/components/Nav'
import Footer from '~/components/Footer'

import appStyleUrl from '~/styles/global.css'

export let links: LinksFunction = () => {
    return [
        { rel: "preconnect", href: "//fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "stylesheet", href: "//fonts.googleapis.com/css?family=Work+Sans:300,400,600,700&amp;lang=en" },
        { rel: 'stylesheet', href: appStyleUrl }
    ]
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: Engineer modern full-stack apps, joyfully! </title>
        <Links/>
      </head>
      <body>
        <div className="container">
            <br/>
            <Header/>
            <Nav/>
            <Outlet/>
            <br/>
            <Footer/>
        </div>
        {process.env.NODE_ENV === "development" ? (
          <LiveReload />
        ) : null}
      </body>
    </html>
  );
}

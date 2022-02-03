import { LiveReload, Outlet, LinksFunction, Links, MetaFunction, Meta } from "remix";

import Header from '~/components/Header'
import Nav from '~/components/Nav'
import Footer from '~/components/Footer'

import appTwStyleUrl from '~/styles/out/tailwind.css'
import appGlobalStyleUrl from '~/styles/out/global.css'
import { SITE } from '~/config'

export let links: LinksFunction = () => {
    return [
        { rel: "preconnect", href: "//fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "stylesheet", href: "//fonts.googleapis.com/css?family=Work+Sans:300,400,600,700&amp;lang=en" },
        { rel: 'stylesheet', href: appTwStyleUrl },
        { rel: 'stylesheet', href: appGlobalStyleUrl }
    ]
}

export let meta: MetaFunction = () => {
    return {
        title: SITE.title,
        keyword: 'Remix, Engineering',
        description: SITE.description,
        // other Og:tags can go here
    }
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <Meta/>
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

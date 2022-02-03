import { LiveReload, Outlet } from "remix";

import Header from '~/components/Header'
import Nav from '~/components/Nav'
import Footer from '~/components/Footer'

import appStyleUrl from '~/styles/global.css'
import blogLayoutStyleUrl from '~/styles/layout-blog.css'
import blogPageStyleUrl from '~/styles/page-blog-index.css'
import blogPostStyleUrl from '~/styles/page-blog-post.css'


export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Remix: Engineer modern full-stack apps, joyfully! </title>
        <link rel="stylesheet" href={appStyleUrl} />
        <link rel="stylesheet" href={blogLayoutStyleUrl} />
        <link rel="stylesheet" href={blogPageStyleUrl} />
        <link rel="stylesheet" href={blogPostStyleUrl} />
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

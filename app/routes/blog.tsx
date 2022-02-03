import { Outlet, LinksFunction, MetaFunction } from "remix"
import { SITE } from '~/config'

import blogLayoutStyleUrl from '~/styles/layout-blog.css'

export let links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: blogLayoutStyleUrl }
    ]
}

export let meta: MetaFunction = () => {
    return {
        title: `${SITE.title} | Blog`
    }
}

export default function BlogLayoutRoute() {
    return (
        <main className="content blog__content">
            <div className="blog__header">
                <h3 className="blog__title">Blog</h3>
                <p className="blog__desc">Learn. Write. Repeat</p>
            </div>
                {/* Blog Content from component inside /blog */}
                <Outlet/>
        </main>
    )
}

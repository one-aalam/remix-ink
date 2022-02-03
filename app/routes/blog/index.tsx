import { LinksFunction, MetaFunction } from "remix"
import PostPreview from "~/components/PostPreview"
import { POSTS, SITE } from '~/config'

import blogPageStyleUrl from '~/styles/out/page-blog-index.css'

export let links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: blogPageStyleUrl }
    ]
}

export let meta: MetaFunction = () => {
    return {
        title: `${SITE.title} | Blog | ${POSTS.length} and counting...`
    }
}

export default function BlogLayoutRoute() {
    return (
        <ul className="blog__list">
         {
            POSTS.map(post => <PostPreview key={post.slug} post={post} />)
         }
        </ul>
    )
}

import { LinksFunction } from "remix"
import PostPreview from "~/components/PostPreview"
import { POSTS } from '~/config'

import blogPageStyleUrl from '~/styles/page-blog-index.css'

export let links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: blogPageStyleUrl }
    ]
}

export default function BlogLayoutRoute() {
    return (
        <ul className="blog__list">
         {
            POSTS.map(post => <PostPreview post={post} />)
         }
        </ul>
    )
}

import { Link } from "remix"
import { POSTS } from '~/config'

export default function BlogLayoutRoute() {
    return (
        <ul className="blog__list">
         {
            POSTS.map(post => <li><Link to={`/blog/${post.slug}`}>{post.title}</Link></li>)
         }
        </ul>
    )
}

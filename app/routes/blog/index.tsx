import { Link } from "remix"
import PostPreview from "~/components/PostPreview"
import { POSTS } from '~/config'

export default function BlogLayoutRoute() {
    return (
        <ul className="blog__list">
         {
            POSTS.map(post => <PostPreview post={post} />)
         }
        </ul>
    )
}

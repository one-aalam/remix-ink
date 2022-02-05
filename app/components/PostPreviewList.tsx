import type { PropsWithChildren, ReactElement } from 'react'
import type { Post } from '.contentlayer/types'
import PostPreview from "~/components/PostPreview"


type PostPreviewListProps = {
    posts: Array<Post>
}

export default function PostPreviewList({ posts }: PropsWithChildren<PostPreviewListProps>): ReactElement {
    return (
        <div className="post-preview-list">
            {
                posts.map(post => <PostPreview key={post.slug} post={post} />)
            }
        </div>
    )
}

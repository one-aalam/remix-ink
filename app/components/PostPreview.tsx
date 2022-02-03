import type { PropsWithChildren, ReactElement } from 'react'
import type { Post } from '~/types'
import { getMonthName } from '~/utils'


export default function PostPreview({ post }: PropsWithChildren<{post: Post}>): ReactElement {
    return (
        <div className="post-preview">
            <div>
                <div className="post-preview__date">
                    <span className="post-preview__date__day">{ new Date(post.date).getDate() }</span>
                    <span className="post-preview__date__month-n-year">{ `${getMonthName(new Date(post.date))} ${new Date(post.date).getFullYear()}` }</span>
                </div>
            </div>
            <div>
                <h4 className="post-preview__title">
                    <a href={`/blog/${post.slug}`} title={post.title}>{post.title}</a>
                </h4>
                <p className="post-preview__desc">
                    {post.description}
                </p>
            </div>
        </div>
    )
}

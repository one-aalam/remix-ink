import { POSTS } from '~/config'

export default function BlogPage() {
    let POST = POSTS[0]
    return (
        <div className="blog__content">
            <div className="post__header">
                <div className="post__tags">
                    { POST.tags.map(tag =>
                    <a className="post__tag" href={`/tags/${tag}`} title={tag}>{tag}</a>)
                }
                </div>
                <h1 className="post__title">{ POST.title }</h1>
                <h5 className="post__desc">
                    <a className="post__author" href={`https://twitter.com/${POST.authorTwitter}`} title={`${POST.author}'s twitter`} target="_blank" rel="external">{ POST.author }</a> |
                    <span className="post__date">{ new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(POST.date))}</span>
                </h5>
            </div>
            <article className="prose">
                {POST.description}
            </article>
        </div>
    )
}

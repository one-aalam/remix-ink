import { useParams, LinksFunction, MetaFunction } from 'remix'
import { POSTS, SITE } from '~/config'

import blogPostStyleUrl from '~/styles/out/page-blog-post.css'


export let links: LinksFunction = () => {
    return [
        { rel: 'stylesheet', href: blogPostStyleUrl }
    ]
}

export let meta: MetaFunction = () => {
    let { slug } = useParams()
    let POST = POSTS.find(post => post.slug === slug )
    return {
        title: `${SITE.title} | Blog | ${POST?.title || 'Not Found'}`,
        description: POST?.description || ''
    }
}


export default function BlogPage() {
    let { slug } = useParams()
    let POST = POSTS.find(post => post.slug === slug )
    return (
        POST ? <div className="post">
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
        </div> : <div className="post_error">
            I didn't find what you're looking for...
        </div>
    )
}

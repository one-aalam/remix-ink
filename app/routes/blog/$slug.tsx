import { MetaFunction, LoaderFunction, useLoaderData, ErrorBoundaryComponent, useCatch } from 'remix'
import type { DataFunctionArgs } from '@remix-run/server-runtime'
import type { Post } from '.contentlayer/types'
import { SITE } from '~/config'
import { getPost } from '~/lib/contentlayer.server'

type LoaderData = {
    data: {
        post: Post | null
    },
    errors: Array<string>
}

export let meta: MetaFunction = ({ data }) => {
    return {
        title: `${SITE.title} | Blog | ${data.data?.post?.title || 'Not Found'}`,
        description: data.post?.description || ''
    }
}

export let loader: LoaderFunction = async ({ params }: DataFunctionArgs ): Promise<LoaderData|Response> => {
    if(params?.slug) {
        const post = await getPost(params?.slug)
        if (!post) {
            return new Response("Not Found", {
              status: 404
            });
        } else {
            return {
                data: { post },
                errors: [],
            }
        }
    } else {
        return {
            data: { post: null },
            errors: [ `Couldn't find what you're looking for`]
        }
    }
}

export default function BlogPage() {
    const { data, errors } = useLoaderData<LoaderData>()
    // Non-match?
    if(!data || !data.post || errors.length) {
        return (<div className="post_error">
            I didn't find what you're looking for...
            <ul>
                {
                    errors.length > 0 && errors.map(error => <li>{error}</li>)
                }
            </ul>
        </div>)
    }
    // Match?
    const { post } = data
    return (
        <div className="post">
            <div className="post__header">
                <div className="post__tags">
                    { post.tags?.map((tag: string) =>
                    <a className="post__tag" href={`/blog?tag=${tag}`} title={tag}>{tag}</a>)
                }
                </div>
                <h1 className="post__title">{ post.title }</h1>
                <h5 className="post__desc">
                    <a className="post__author" href={`https://twitter.com/${post.authorTwitter}`} title={`${post.author}'s twitter`} target="_blank" rel="external">{ post.author }</a> |
                    <span className="post__date">{ new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(post.date))}</span>
                </h5>
            </div>
            <article className="prose" dangerouslySetInnerHTML={{ __html: post.body.html}}>
            </article>
        </div>
    )
}

export let CatchBoundary = () => {
    const caught = useCatch();
    return (
      <div>
        <h3 className="text-5xl">{caught.status}</h3>
        <h2>We couldn't find that page!</h2>
      </div>
    );
}

export let ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
}

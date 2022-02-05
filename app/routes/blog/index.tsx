import { LoaderFunction, MetaFunction, useLoaderData, Link, ErrorBoundaryComponent } from "remix"
import type { Post } from '.contentlayer/types'
import { SITE } from '~/config'
import { getPosts } from '~/lib/contentlayer.server'
import PostPreviewList from '~/components/PostPreviewList'

type LoaderData = {
    posts: Array<Post>,
    categories: Array<string>,
    tags: Array<string>,
    selected: {
        category?: string,
        tag?: string
    }
}

export let meta: MetaFunction = ({ data, parentsData }) => {
    return {
        title: `${SITE.title} | Blog | ${data.length} and counting...`
    }
}

export let loader: LoaderFunction = async ({ request }): Promise<LoaderData> => {
    const posts = await getPosts()
    const params = new URL(request.url).searchParams
    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const tags = [...new Set([].concat.apply([], posts.map(post => post.tags)))]
    const categories =  [...new Set(posts.map(post => post.category!))]

    // Got a tag?
    if(params.get('tag')) {
        const tag = params.get('tag')!
        const postsByTag = sortedPosts
            .filter(
                post => post.tags && post.tags.includes(tag)
            )
        return {
                posts: postsByTag,
                tags,
                categories,
                selected: {
                    tag
                }
        }
    }

    // Got a category?
    if(params.get('category')) {
        const category = params.get('category')!
        const postsByCatgeory = sortedPosts
            .filter(
                post => post.category && post.category == category
            )
        return {
            posts: postsByCatgeory,
            tags,
            categories,
            selected: {
                category
            }
        }
    }

    // Got both?
    if(params.get('tag') && params.get('category')) {
        const tag = params.get('tag')!
        const category = params.get('category')!
        const postsByTagAndCatgeory = sortedPosts
            .filter(
                post => post.tags && post.category && post.tags.includes(params.get('tag')) && post.category == params.get('category')
            )
        return {
            posts: postsByTagAndCatgeory,
            tags,
            categories,
            selected: {
                tag,
                category
            }
        }
    }

    // All ?
    return {
        posts: sortedPosts,
        categories,
        tags,
        selected: {}
    }
}

export default function BlogLayoutRoute() {
    const { posts, categories, tags, selected } = useLoaderData<LoaderData>()
    // If you wanna get selection client-side
    // const [ params ] = useSearchParams()
    // const selectedTag = params.get('tag')
    // const selectedCategory = params.get('category')

    return (
        <div>
            <div className="page__filters flex w-full justify-end gap-2 bg-gray-50 py-2 border-t border-b">
                <div className="posts__category">
                    <strong className="uppercase text-gray-500">Categories:</strong> { categories.map(category => <Link to={`.?category=${category}`}>{category}</Link>)}
                </div>
                <div className="posts__tags">
                    <strong className="uppercase text-gray-500">Tags:</strong> { tags.map(tag =>
                        <Link to={`.?tag=${tag}`} className={`px-2 py-1 ${selected.tag && selected.tag === tag ? 'bg-gray-200 text-blue-900' : ''}`}>{tag}</Link>
                    )}
                </div>
            </div>
            <br className="spacer"/>
            <PostPreviewList posts={posts} />
        </div>
    )
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

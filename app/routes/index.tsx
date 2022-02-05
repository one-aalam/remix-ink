import { MetaFunction, LoaderFunction, useLoaderData } from 'remix'
import type { Post } from '.contentlayer/types'
import { SITE, FEATURED_POSTS } from '~/config'
import { getPosts } from '~/lib/contentlayer.server'
import HelloWorld from '~/components/HelloWorld'
import PostPreviewList from '~/components/PostPreviewList'


type LoaderData = {
    posts: Array<Post>,
    featured?: Array<Post>
}

export let meta: MetaFunction = () => {
    return {
        title: `${SITE.title} | Homepage`
    }
}

export let loader: LoaderFunction = async (): Promise<LoaderData> => {
    const posts = await getPosts()
    const sortedPosts = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return {
        posts: sortedPosts,
        featured: posts.filter(post => FEATURED_POSTS.includes(post.slug))
    }
}

export default function Index() {
    const { posts, featured } = useLoaderData<LoaderData>()
    return (
        <div className="">
            <br className="spacer"/>
            <strong className="uppercase text-gray-500">Featured Posts</strong>
            <br className="spacer"/>
            <main>
                {featured && <PostPreviewList posts={featured} />}
            </main>
            <br className="spacer"/>
            <strong className="uppercase text-gray-500">Latest Posts</strong>
            <br className="spacer"/>
            <aside>
                <PostPreviewList posts={posts} />
            </aside>
        </div>
    )
}

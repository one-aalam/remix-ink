import { LoaderFunction, MetaFunction, useLoaderData } from "remix"
import PostPreview from "~/components/PostPreview"
import type { Post } from '.contentlayer/types'
import { SITE } from '~/config'
import { getPosts } from '~/lib/contentlayer.server'

export let meta: MetaFunction = ({ data, parentsData }) => {
    return {
        title: `${SITE.title} | Blog | ${data.length} and counting...`
    }
}

export let loader: LoaderFunction = async () => {
    const posts = await getPosts()
    return posts
}

export default function BlogLayoutRoute() {
    const posts = useLoaderData<Array<Post>>()
    return (
        <ul className="blog__list">
         {
            posts.map(post => <PostPreview key={post.slug} post={post} />)
         }
        </ul>
    )
}

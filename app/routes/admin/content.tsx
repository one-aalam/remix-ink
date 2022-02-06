import { LoaderFunction, Outlet, useLoaderData, Link } from "remix"
import { FaHome } from "react-icons/fa"
import type { Post } from '.contentlayer/types'
import { getPosts } from "~/lib/contentlayer.server"


type LoaderData = {
    posts: Array<Post>,
    selected?: Post
}

export type ContextType = { posts: Array<Post> | null, selected?: Post };

export let loader: LoaderFunction = async ({ params }): Promise<LoaderData|Response> => {
    const posts = await getPosts()
    const selected = params.slug ? posts.find(post => post.slug === params.slug) : {}

    return new Response(JSON.stringify({
        posts,
        selected
    }), {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    })
}

export default function AdminIndex() {
    const { posts, selected } = useLoaderData<LoaderData>()
    return (
        <div className="">
            <main className="content page__content">
                <div className="page__header">
                    <h3 className="page__title">Admin</h3>
                    <p className="page__desc">Manage your site effortlessly!</p>
                </div>
                <div className="admin-shell flex">
                    <div className="admin-shell__sidebar">
                        <Link className="action-btn" to={`.`}><FaHome className="w-8 h-8"/></Link>
                    </div>
                    <div className="admin-shell__content">
                        <Outlet context={{ posts, selected }}/>
                    </div>
                </div>
            </main>
        </div>
    )
}

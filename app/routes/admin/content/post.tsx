import { useOutletContext, Link, ActionFunction } from "remix"
import { FaEdit, FaTrash } from 'react-icons/fa'
import type { ContextType } from '../content'
import { deletePost } from '~/lib/contentlayer.server'

type FormMethod = 'get' | 'post' | 'delete'
export let action: ActionFunction = async ({ request }) => {
    let formData = await request.formData()
    let method = formData.get('_method') as FormMethod
    let slug = formData.get('slug') as string

    if(method === 'delete') {
        await deletePost(slug)
    }

    return {

    }
}

export default function AdminPostIndex() {
    const { posts } = useOutletContext<ContextType>()
    return (
        <div className="admin-page">
            <div className="admin-page__heading">
                <strong className="uppercase"> Manage Posts</strong>
            </div>
            <br className="spacer" />
            <div className="admin-page__actionbar">
                <Link className="btn btn-primary btn-sm shadow-md" to={`./add`}>Add a new Post </Link>
            </div>
            <br className="spacer" />
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Added</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        posts?.map(
                            post =>
                            <tr key={post.slug}>
                                <td className="">
                                    <Link to={`./${post.slug}/edit`}>
                                        <p className=" max-w-xs text-ellipsis"><FaEdit className="inline-block"/>&nbsp;{post.title}</p>
                                    </Link>
                                </td>
                                <td className=""><button className=" btn btn-xs btn-outline">{post.category}</button></td>
                                <td>{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(post.date))}</td>
                                <td>
                                    <form method="POST">
                                        <input type={'hidden'} name="_method" value={'delete'} />
                                        <input type={'hidden'} name="slug" value={post.slug} />
                                        <button type="submit" className="btn btn-error btn-sm shadow-md">
                                            <FaTrash />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
            <br className="spacer"/>
        </div>
    )
}

import { useOutletContext, Link } from "remix"
import { FaEdit } from 'react-icons/fa'
import type { ContextType } from '../content'

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
                    </tr>
                    </thead>
                    <tbody>
                    {
                        posts?.map(
                            post =>
                            <tr key={post.slug}>
                                <td><Link to={`./${post.slug}/edit`}><FaEdit className=" inline-block"/>&nbsp;{post.title}</Link></td>
                                <td className=""><button className=" btn btn-xs btn-outline">{post.category}</button></td>
                                <td>{new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(post.date))}</td>
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

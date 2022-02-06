import { Link } from "remix"

export default function AdminIndex() {
    return (
        <div className="w-full flex flex-wrap">
            <Link className="action-tile"  to={`./post`}>
                <strong className="action-tile__title">Manage Posts</strong>
                <p className="action-tile__desc">View, Edit and update your posts</p>
            </Link>
        </div>
    )
}

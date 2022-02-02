import { Outlet } from "remix"

export default function BlogLayoutRoute() {
    return (
        <div className="blog__content">
            <div className="blog__heading">
                <h3>Blog</h3>
                <p>Learn. Write. Repeat</p>
            </div>
                {/* Blog Content from component inside /blog */}
                <Outlet/>
        </div>
    )
}

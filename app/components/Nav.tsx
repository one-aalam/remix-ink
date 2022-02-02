import { toTitleCase } from '~/utils'
import { NAV_ITEMS } from "~/config"

export default function Nav(){
    return (
        <nav className="nav">
            <ul className="nav__list">
                {

                    Object.keys(NAV_ITEMS).map((navItemKey: string) => {
                        // @ts-ignore
                        const { path, title } = NAV_ITEMS[navItemKey]
                        return (
                    <li key={navItemKey}>
                        <a href={path} title={title}>{toTitleCase(title)}</a>
                    </li>)})
                }
            </ul>
    </nav>
    )
}

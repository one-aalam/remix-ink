
import { SITE } from '~/config'
export default function Footer() {
return (<footer className="footer">
    <nav className="nav">
        <div>2021  &copy; Copyright notice |  <a href={ SITE.githubUrl } title={`${ SITE.name }'s Github URL'`}>{ SITE.name }</a>
        </div>
    </nav>
</footer>)
}

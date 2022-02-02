import { SITE } from '~/config'

export default function Header() {
    return (<header className="header">
    <div className="header__logo">
        <a href="/" className="avatar-or-logo">
            <img className="header__logo-img" width={50} src="/remix-light.png" alt="Remix logo" />
        </a>
    </div>
    <div className="header__meta">
        <h3 className="header__title">
            <a href="">{ SITE.name }</a>
        </h3>
        <div className="header__meta-more">
            <p className="header__desc">
                { SITE.description }
            </p>
            <nav className="header__nav">
                <ul className="header__ref-list">
                    <li>
                        <a href={ SITE.githubUrl } title={`${ SITE.name }'s Github URL'`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="/rss.xml" title="RSS">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">

                                <path d="M4 11a9 9 0 0 1 9 9"></path>
                                <path d="M4 4a16 16 0 0 1 16 16"></path>
                                <circle cx="5" cy="19" r="1"></circle>
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>)
}

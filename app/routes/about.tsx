import { MetaFunction } from 'remix'
import { SITE } from '~/config'

export let meta: MetaFunction = () => {
    return {
        title: `${SITE.title} | About`
    }
}

export default function About() {
    return (
        <div className="">
            <main>
                About
            </main>
        </div>
    )
}

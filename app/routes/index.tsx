import { MetaFunction } from 'remix'
import HelloWorld from '~/components/HelloWorld'
import { SITE } from '~/config'

export let meta: MetaFunction = () => {
    return {
        title: `${SITE.title} | Homepage`
    }
}

export default function Index() {
    return (
        <div className="">
            <main>
                <HelloWorld/>
            </main>
        </div>
    )
}

import { ActionFunction, useOutletContext } from "remix"
import slugify from "slugify"
import PostForm from '~/components/PostForm'
import type { ContextType } from '../content'
import { createPost, PostData } from '~/lib/contentlayer.server'
import { PRIMARY_AUTHOR } from "~/config"

export let action: ActionFunction = async ({ request }) => {
    let formFieldEntries = await (await request.formData()).entries()
    let formFields: Partial<PostData> = {}

    // Collect
    let result = formFieldEntries.next()
    while(!result.done) {
        const [ fieldName, fieldValue ] = result.value as [ keyof PostData, FormDataEntryValue ]
        if(formFields[fieldName]) {
            formFields[fieldName] = [ ...typeof formFields[fieldName] === 'string' ? [formFields[fieldName]] : formFields[fieldName], fieldValue ]
        } else {
            formFields[fieldName] = fieldValue
        }
        result = formFieldEntries.next()
    }

    // Transform
    if(formFields.title) {
        formFields.slug = slugify(formFields.title)
    }
    if(formFields.tags) formFields.tags = []

    // Set defaults
    formFields.date = new Date().toISOString()
    formFields.author = PRIMARY_AUTHOR.author
    formFields.authorTwitter = PRIMARY_AUTHOR.authorTwitter

    // Save
    const post = await createPost(formFields as PostData)
    return {

    }
}
export default function AdminPostAddPage() {
    const { posts, selected } = useOutletContext<ContextType>()
    return (
        <div className="admin-page">
            <div className="admin-page__heading">
                <strong className="uppercase">Manage Posts</strong>
            </div>
            <br className="spacer" />
            <div className="w-full">
                <PostForm actionLbl={'Create Post'} />
            </div>
            <br className="spacer"/>
        </div>
    )
}

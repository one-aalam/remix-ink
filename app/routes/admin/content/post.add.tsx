import { ActionFunction, redirect, useActionData, useOutletContext } from "remix"
import slugify from "slugify"
import PostForm from '~/lib/post/PostForm'
import { postCreateSchema, PostFieldErrors, PostFieldValues } from '~/lib/post/config'
import type { ContextType } from '../content'
import { createPost, PostData } from '~/lib/contentlayer.server'
import { PRIMARY_AUTHOR } from "~/config"

export type ActionData = { errors?: PostFieldErrors, values?: PostFieldValues }
const castAsArray: Array<keyof PostData> = ['tags']

export let action: ActionFunction = async ({ request }): Promise<ActionData|Response> => {
    let formFieldEntries = await (await request.formData()).entries()
    let formFields: Partial<PostData> = {}

    // Collect
    let result = formFieldEntries.next()
    while(!result.done) {
        const [ fieldName, fieldValue ] = result.value as [ keyof PostData, FormDataEntryValue ]
        if(formFields[fieldName]) {
            formFields[fieldName] = [ ...typeof formFields[fieldName] === 'string' ? [formFields[fieldName]] : formFields[fieldName], fieldValue ]
        } else {
            formFields[fieldName] = castAsArray.includes(fieldName) && typeof fieldValue === 'string' ? [ fieldValue ] : fieldValue
        }
        result = formFieldEntries.next()
    }

    // Validate
    let parsedPost = postCreateSchema.safeParse(formFields)
    if(!parsedPost.success) {
        return {
            errors: parsedPost.error.formErrors.fieldErrors,
        }
    } else {
        let { data } = parsedPost

        let postData: PostData = {
            ...data,

            // Transform
            tags: data.tags || [],
            slug: slugify(data.title),

            // Set defaults
            date: new Date().toISOString(),
            updated: new Date().toISOString(),
            author: PRIMARY_AUTHOR.author,
            authorTwitter: PRIMARY_AUTHOR.authorTwitter
        }
        // Save
        let post = await createPost(postData)
        return redirect('.')
    }
}

export default function AdminPostAddPage() {
    const { posts, selected } = useOutletContext<ContextType>()
    const actionData = useActionData<ActionData>()
    return (
        <div className="admin-page">
            <div className="admin-page__heading">
                <strong className="uppercase">Manage Posts</strong>
            </div>
            <br className="spacer" />
            <div className="w-full">
                <PostForm actionLbl={'Create Post'} errors={actionData?.errors} />
            </div>
            <br className="spacer"/>
        </div>
    )
}

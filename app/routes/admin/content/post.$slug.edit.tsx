import { ActionFunction, useActionData, useOutletContext, redirect } from "remix"
import PostForm from '~/lib/post/PostForm'
import { postUpdateSchema, PostFieldErrors, PostFieldValues } from '~/lib/post/config'
import type { ContextType } from '../content'
import { updatePostBySlug, getPost, PostData, toPostData } from '~/lib/contentlayer.server'

export type ActionData = { errors?: PostFieldErrors, values?: PostFieldValues }
const castAsArray: Array<keyof PostData> = ['tags']


export let action: ActionFunction = async ({ request, params }): Promise<ActionData|Response> => {
    let formFieldEntries = await (await request.formData()).entries()
    let formFields: Partial<PostData> = {}

    if(params.slug) {
        let post = await getPost(params.slug)
        if (post) {
            let postData = toPostData(post)
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

            let parsedPost = postUpdateSchema.safeParse(formFields)
            if(!parsedPost.success) {
                return {
                    errors: parsedPost.error.formErrors.fieldErrors,
                }
            } else {
                let { data } = parsedPost
                postData = {
                    ...postData, // previous value
                    ...data, // new value
                    updated: new Date().toISOString()
                }
                await updatePostBySlug(postData, params.slug)
                return redirect('..')
            }
        } else {
            return new Response('Not Found', {
                status: 404
            })
        }
    }
    return {

    }
}

export default function AdminPostUpdatePage() {
    const { selected } = useOutletContext<ContextType>()
    const actionData = useActionData<ActionData>()
    return (
        <div className="admin-page">
            <div className="admin-page__heading">
                <strong className="uppercase">Manage Posts</strong>
            </div>
            <br className="spacer" />
            <div className="w-full">
                <PostForm actionLbl={'Update Post'} errors={actionData?.errors} values={{...selected, body: selected?.body.raw!} as PostFieldValues} />
            </div>
            <br className="spacer"/>
        </div>
    )
}

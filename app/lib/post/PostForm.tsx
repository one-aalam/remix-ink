import { PropsWithChildren, ReactElement } from "react";
import { PostFieldErrors } from './config'

type PostFormProps = {
    actionLbl?: string,
    errors?: PostFieldErrors
}

export default function ProductCollectionForm({
    actionLbl = 'Submit',
    errors,
    children
}: PropsWithChildren<PostFormProps>): ReactElement {

    return (
        <form className="form" method="post">
            <div className="w-full flex gap-3">
                <div className="w-2/3">
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input className={`${errors?.title ? 'has-error' : ''}`} type="text" id="title" name="title" />
                        {errors?.title && errors.title.map(error => <div className="error">{error}</div>)}
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea className={`${errors?.description ? 'has-error' : ''}`} id="description" name="description" rows={2} />
                        {errors?.description && errors.description.map(error => <div className="error">{error}</div>)}
                    </div>
                    <div className="form-control">
                        <label htmlFor="body">Content</label>
                        <textarea className={`${errors?.body ? 'has-error' : ''}`} id="body" name="body" rows={5} />
                        {errors?.body && errors.body.map(error => <div className="error">{error}</div>)}
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="form-control">
                            <label htmlFor="title">Category</label>
                            <select className={`${errors?.category ? 'has-error' : ''}`} id="category" name="category" placeholder="Select a category">
                                <option value={'design'}>design</option>
                                <option value={'development'}>development</option>
                            </select>
                            {errors?.category && errors.category.map(error => <div className="error">{error}</div>)}
                    </div>
                    <div className="form-control">
                            <label htmlFor="title">Tags</label>
                            <select className=" max-h-36 overflow-x-auto" id="tags" name="tags" multiple={true}>
                                <option value={'design'}>design</option>
                                <option value={'development'}>development</option>
                                <option value={'design'}>design</option>
                                <option value={'development'}>development</option>
                            </select>
                    </div>
                </div>
            </div>
            {children}
            <div className="form-action">
                <button className="btn btn-primary" type="submit">{actionLbl}</button>
            </div>
        </form>
    )
}

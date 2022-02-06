import { PropsWithChildren, ReactElement } from "react";

type PostFormProps = {
    actionLbl?: string,
}

export default function ProductCollectionForm({
    actionLbl = 'Submit',
    children
}: PropsWithChildren<PostFormProps>): ReactElement {

    return (
        <form className="form" method="post">
            <div className="w-full flex gap-3">
                <div className="w-2/3">
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" rows={2} />
                    </div>
                    <div className="form-control">
                        <label htmlFor="body">Content</label>
                        <textarea id="body" name="body" rows={5} />
                    </div>
                </div>
                <div className="w-1/3">
                    <div className="form-control">
                            <label htmlFor="title">Category</label>
                            <select id="category" name="category">
                                <option value={'design'}>design</option>
                                <option value={'development'}>development</option>
                            </select>
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

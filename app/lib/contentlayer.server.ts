import { promises as fs, constants } from 'fs'
import path from 'path'
import { dump } from 'js-yaml'
import { spawn } from 'child_process'
import { Post, Markdown } from '.contentlayer/types'

export const CONTENT_LAYER_DIR = path.join(__dirname, "..", "node_modules", ".contentlayer", "data");
export const CONTENT_POST_DIR = path.join(CONTENT_LAYER_DIR, "Post");
export const CONTENT_SRC_POST_DIR = path.join(__dirname, "..", "content", "posts")

export type PostData = Omit<Post, '_id' | '_raw' | 'type' | 'url' | 'body'> & { body: string | Markdown }

/**
 *
 * @param post ContentLayer Post with internal and computed properties
 * @returns Normalized Post
 */
export function toPostData(post: Post): PostData {
    const { _id, _raw, type, url, ...rest } = post
    return rest
}

/**
 *
 * @returns all the posts generated from `/content/posts/*.md/
 */
export async function getPosts(): Promise<Array<Post>> {
    // due to a bug, the files generated once by content layer are not removed, this will lead to deleted file names loaded as an outcome of the scan. We check the files in the source dir to identify their targets and correctly load them
    // const dir = await fs.readdir(CONTENT_POST_DIR)
    const dir = await fs.readdir(CONTENT_SRC_POST_DIR)

    return Promise.all(
      dir.map(async filename => {
        const file = await getJsonData<Post>(path.join(CONTENT_POST_DIR, `${filename}.json`))
        return file
      })
    );
}

export async function getPostSourceFilenames(): Promise<Array<string>> {
    return await fs.readdir(CONTENT_SRC_POST_DIR)
}

/**
 *
 * @param slug the slug for the post
 * @returns the post
 */
export async function getPost(slug: string): Promise<Post|null> {
    try {
        const file = await getJsonData<Post>(path.join(CONTENT_POST_DIR, `${slug}.md.json`))
        return file
    } catch (e) {
        return null
    }

}

export async function createPost(data: PostData) {
    const { body, slug, ...frontMatter } = data
    const markdown = `---\n${dump(frontMatter)}---\n${body}`;
    await fs.writeFile(path.join(CONTENT_SRC_POST_DIR, `${slug}.md`), markdown);
    await syncContent()
    return data
}

export async function syncContent(): Promise<number|null> {
    return new Promise((resolve, reject) => {
        const syncContent = spawn('npm', ['run', 'build:content'])
        syncContent.on('close', (code) => {
            console.log(`sync closed with code: ${code}`)
            resolve(code)
        })
        syncContent.on('error', (error) => {
            reject(error)
        })
    })
}

export async function updatePostBySlug(data: PostData, fileSlug: string) {
    try {
        let file = path.join(CONTENT_SRC_POST_DIR, `${fileSlug}.md`)
        await fs.access(file, constants.R_OK | constants.W_OK )
        await fs.unlink(file)
        return await createPost(data)
    } catch(e) {
        //
    }
}

export async function deletePost(fileSlug: string) {
    try {
        let file = path.join(CONTENT_SRC_POST_DIR, `${fileSlug}.md`)
        await fs.access(file, constants.R_OK | constants.W_OK )
        await fs.unlink(file)
        return true
    } catch(e) {
        console.error(`Couldn't find a file with slug: ${fileSlug} (in the source dir: ${CONTENT_SRC_POST_DIR})`)
        return false
    }
}

/**
 *
 * @param jsonPath the path to the Contentlayer generated .json file
 * @returns the <T>yped JSON data
 */
export async function getJsonData<T>(jsonPath: string): Promise<T> {
    const content = await fs.readFile(jsonPath, 'utf-8')
    return JSON.parse(content)
}

import { promises as fs } from 'fs'
import path from 'path'
import { Post } from '.contentlayer/types'

export const CONTENT_LAYER_DIR = path.join(__dirname, "..", "node_modules", ".contentlayer", "data");
export const CONTENT_POST_DIR = path.join(CONTENT_LAYER_DIR, "Post");

/**
 *
 * @returns all the posts generated from `/content/posts/*.md/
 */
export async function getPosts(): Promise<Array<Post>> {
    const dir = await fs.readdir(CONTENT_POST_DIR)
    return Promise.all(
      dir.map(async filename => {
        const file = await getJsonData<Post>(path.join(CONTENT_POST_DIR, filename))
        return file
      })
    );
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

/**
 *
 * @param jsonPath the path to the Contentlayer generated .json file
 * @returns the <T>yped JSON data
 */
export async function getJsonData<T>(jsonPath: string): Promise<T> {
    const content = await fs.readFile(jsonPath, 'utf-8')
    return JSON.parse(content)
}

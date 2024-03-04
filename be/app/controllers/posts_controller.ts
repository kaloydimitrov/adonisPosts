import type { HttpContext } from '@adonisjs/core/http'
import Post from '#models/post';

export default class PostsController {
    async create({ request, response }: HttpContext) {
        try {
            const { title, content } = request.only(['title', 'content']);

            const post = new Post();
            post.title = title;
            post.content = content;

            await post.save();

            return response.status(201).json({ message: 'Post created successfully', data: post });
        } catch (error) {
            console.error('Error creating post:', error);
            return response.status(500).json({ error: 'Internal server error' });
        }
    }

    async index({ response }: HttpContext) {
        try {
            const posts = await Post.all();

            return response.json({ data: posts });
        } catch (error) {
            console.error('Error fetching posts:', error);
            return response.status(500).json({ error: 'Internal server error' });
        }
    }
}
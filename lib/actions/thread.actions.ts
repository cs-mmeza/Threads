'use server'; // we can't create directly actions through the browser side
import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface params {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
}
export async function createThread({
    text,
    author,
    communityId,
    path,
}: params) {
    try {
        connectToDB();

        const createdThread = await Thread.create({
            text,
            author,
            communityId: null,
        });

        //update user model
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }
        })
        // changes inmediadately reflected in client
        revalidatePath(path);

    } catch (error: any) {
        throw new Error(`Failed to create thread: ${error.message}`);
    }

}

export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    //Calculate the skip amount
    const skipAmount = pageSize * (pageNumber - 1);

    //Fetch the post that have no parents (top-level threads...)
    const postsQuery = Thread.find({parentId: {$in: [null, undefined]}})
        .sort({createdAt: 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({path: 'author', model: User, })
        .populate({
            path: 'children', 
            populate: {
                path: 'author',
                model: 'User',
                select: '_id name parentId image'
            }
        });
        const totalPostsCount = await Thread.countDocuments({parentId: {$in: 
            [null, undefined]} })

        const posts = await postsQuery.exec();

        const isNext = totalPostsCount > skipAmount + posts.length;

        return { posts, isNext };
}
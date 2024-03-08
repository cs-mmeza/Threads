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

export async function fetchThreadById(threadId: string) {
    connectToDB();

    try {
        //TODO: populate community and children
        const thread = await Thread.findById(threadId)
            .populate({
                path: 'author',
                model: User,
                select: "_id name image"
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: '_id name parentId image'
                    },
                    {
                        path: 'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select: '_id id name parentId image'
                        },
                    },
                ],
            }).exec();

            return thread;
    } catch (error: any) {
        throw new Error(`Error fetching thread: ${error.message}`);

    }
}

export async function addCommentToThread(
    threadId: string, 
    commentText: string,
    userId: string,
    path: string,
    ) {
        connectToDB();

        try {
            //find the original thread by its id
            const originalThread = await Thread.findById(threadId);

            if (!originalThread) {
                throw new Error("Thread not found");
            }

            //create a new thread with the comment
            const commentThread = new Thread({
                text: commentText,
                author: userId,
                parentId: threadId,
            })

            // Save the comment thread to the database
            const savedCommentThread = await commentThread.save();

             // Add the comment thread's ID to the original thread's children array
            originalThread.children.push(savedCommentThread._id);

            //save original thread
            await originalThread.save();

            revalidatePath(path);

        } catch (error: any) {
            console.error("Error adding comment:", error);
            throw new Error(`Error adding comment: ${error.message}`);
        }
        
    };
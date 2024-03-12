"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import page from "@/app/(root)/thread/[id]/page";
import { FilterQuery, SortOrder } from "mongoose";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

//update the user
export async function updateUser({
  userId,
  bio,
  name,
  path,
  username,
  image,
}: Params): Promise<void> {
  try {
    connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true, // 
      },
      { upsert: true } 
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDB(); // connect to the db first

    // Find all threads authored by the user with the given userId
    return await User
                .findOne({ id: userId })
                // .populate({
      // path: "threads",
      // model: Thread,
      // populate: [
      //   {
      //     path: "community",
      //     model: Community,
      //     select: "name id image _id", // Select the "name" and "_id" fields from the "Community" model
      //   },
      //   {
      //     path: "children",
      //     model: Thread,
      //     populate: {
      //       path: "author",
      //       model: User,
      //       select: "name image id", // Select the "name" and "_id" fields from the "User" model
      //     },
      //   },
      // ],
    // });
  
  } catch (error) {
    console.error("Error fetching user threads:", error);
    throw error;
  }
}

export async function fetchUserPosts(userId: string) {
  try {
    connectToDB();

    // Find all threads authored by the user with the given userId

    // TODO populate the community section
    const threads = await User.findOne({ id: userId })
      .populate({
        path: "threads",
        model: Thread,
        populate: {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: "User",
            select: "name image id", // Select the "name" and "_id" fields from the "User" model
             }
           },
       }); 
      return threads;
    } catch (error: any) {
        throw new Error(`Error fetching user Post: ${error.message}`);
      }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumer = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumer?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDB();
    //implement entire pagination functionality, similar to post
    // calculate number of uses to skip based on the page number and page size.
    const skipAmount = (pageNumer - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User>= {
      id: { $ne: userId },
    }
    if(searchString.trim() !== '') {
      query.$or = [
        { name: { $regex: regex } },
        { username: { $regex: regex } },
      ];
    }
    const sortOptions = { createdAt: sortBy };

    const userQuery = User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    //execute users query
    const users = await userQuery.exec(); 

    const isNext = totalUsersCount > skipAmount + users.length;

    return { users, isNext };
  } catch (error: any) {
    throw new Error(`Fail to fetch users: ${error.message}`);
  }
}
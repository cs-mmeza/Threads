import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { id: string } }) => { //params next.js
    if (!params.id) return null;

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    const thread = await fetchThreadById(params.id);
    return (
        <section className="relative">
            <div>
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={user?.id || ""}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    communityId={thread.communityId}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            </div>
            <div className="mt-7">
                <Comment 
                    threadId={thread.id} 
                    currentUserImg={user.imageUrl} //from clerk
                    currentUserId={JSON.stringify(userInfo._id)} //from the db
                />
            </div>
            <div>

            </div>

        </section>
    );
}

export default page;
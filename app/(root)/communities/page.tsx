import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";


const Page = async ( ) => { //params next.js
  const user = await currentUser();
  if (!user) return null; 

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id); 
  if (!userInfo?.onboarded) redirect("/onboarding");

  //fetch communities
  const result = await fetchCommunities({
    searchString: "",
    pageNumer: 1,
    pageSize: 10 
  })
    return ( 
    <section>
        <h1 className="head-text mb-10">Communities</h1>

    { /* Search bar*/ }

    <div className="flex flex-col gap-9 mt-14">
        {result.communities.length === 0 ? (
            <p className="no-result">No users</p>
        ) : (
            <>
                {result.communities.map((community) => (
                    <CommunityCard
                         key={community.id}
                         id={community.id}
                         name={community.name}
                         username={community.username}
                         imgUrl={community.image}
                         bio={community.bio}
                         members={community.members}
                    />
                ))}
            </>
        )}
    </div>
    </section> );
}
 
export default Page;
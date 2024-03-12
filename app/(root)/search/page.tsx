import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";


const Page = async ( ) => { //params next.js
  const user = await currentUser();
  if (!user) return null; 

  // fetch organization list created by user
  const userInfo = await fetchUser(user.id); 
  if (!userInfo?.onboarded) redirect("/onboarding");

  //fetch users
  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumer: 1,
    pageSize: 10 
  })
    return ( 
    <section>
        <h1 className="head-text mb-10">Search</h1>

    { /* Search bar*/ }

    <div className="flex flex-col gap-9 mt-14">
        {result.users.length === 0 ? (
            <p className="no-result">No users</p>
        ) : (
            <>
                {result.users.map((person) => (
                    <UserCard
                         key={person.id}
                         id={person.id}
                         name={person.name}
                         username={person.username}
                         imgUrl={person.image}
                         personType='User'
                    />
                ))}
            </>
        )}
    </div>
    </section> );
}
 
export default Page;
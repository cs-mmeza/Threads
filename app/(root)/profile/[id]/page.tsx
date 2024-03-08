import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";

async function Page( { params }: { params: { id: string } }) { //params next.js
  const user = await currentUser();
  if (!user) return null;

  // fetch organization list created by user
  const userInfo = await fetchUser(params .id);
  if (!userInfo?.onboarded) redirect("/onboarding");

    return ( 
        <section>
            <ProfileHeader 
                accountId={userInfo.id}
                authUserId={user.id}
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.imgUrl}
                bio={userInfo.bio} /> 
        </section>
     );
}
 
export default Page;
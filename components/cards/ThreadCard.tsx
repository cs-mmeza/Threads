interface Props{
    key: string;
    id: string;
    currentUserId: string; 
    parentId: string | null;
    content: string;
    author: {
        id: string;
        image: string;
        name: string;
    }
    communityId: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;
        }
    }[]
    isComment?: boolean;
} 

const ThreadCard = ({
    key,
    id,
    currentUserId,
    parentId,
    content,
    author,
    communityId,
    createdAt,
    comments
}: Props) => {
    return ( <article>
        <h2 className="text-small-regular text-light-2">
            {content}
        </h2>
    </article> );
}
 
export default ThreadCard;
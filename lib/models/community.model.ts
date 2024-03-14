import  mongoose  from "mongoose";

const communitySchema = new mongoose.Schema({
    id: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    image: {type: String},
    bio: {type: String},
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Thread"
        }
    ],
    members: [ //so multiple users can belong as members of a specific community 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

const Community = mongoose.models.Community || mongoose.model("Community", communitySchema);

export default Community;
import mongoose,{model , Schema} from "mongoose";

const connectdb = async()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/second_brain_clone");
        console.log("Database connected successfully");
    }
    catch(err){
        if(err instanceof Error){  //check if thing was created from error class
            console.error("Database connection error:", err.message);
        }
        else{
            console.error("Unknown error:", err);
        }
        process.exit(1);  //npm install --save-dev @types/node  downloaded this
        //actually it provides a declaration file file like for process, fs , require etc.

        //app will not be longer running after this
    }
}

connectdb();


//Now Given below will look a bit confusing as I am using type script and still not specifying types as mongoose and typescript works magically here specifying the type but still on runtime if some give password 123 an int the typescript may notbe able to caught it so or that it's a better approch to make an interface for user specyfying types
//  const userSchema = new Schema<IUser>({
//      username: { type: String, required: true, unique: true },
//      password: { type: String, required: true }
//  });

const userSchema = new Schema({
    username :{type: String , required: true, unique:true},
    password:{type :String , required: true}
})

export const userModel = model("User", userSchema);


const contentSchema = new Schema({
    title: {type:String , required: true},
    link: String,
    type: String,
    userId: {type: Schema.Types.ObjectId, ref:"User", required: true},
    tags: [{type: Schema.Types.ObjectId, ref:"Tag"}]
})

export const contentModel = model("Content", contentSchema);

const tagSchema = new Schema({
    name : {type:String, required:true},
    userId: {type: Schema.Types.ObjectId, ref:"User", required:true}
})

export const tagModel = model("Tag", tagSchema);

const linkSchema = new Schema({
    url : {type:String, required:true},
    userId: {type: Schema.Types.ObjectId, ref:"User", required:true}
})

export const linkModel = model("Link", linkSchema);
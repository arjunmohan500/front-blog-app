const mongoose=require("mongoose")
const schema=mongoose.Schema(

    {
        "username":String,
        "email":String,
        "password":String
    }
)

let blogmodel=mongoose.model("users",schema)
module.exports={blogmodel}
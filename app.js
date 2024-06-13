const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcryptjs")


const { blogmodel } = require("./model/Blog")
const app = express()

app.use(cors())
app.use(express.json())
mongoose.connect("mongodb+srv://arjun:arjun2001@cluster0.jyq1ewu.mongodb.net/blogdb?retryWrites=true&w=majority&appName=Cluster0")


const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}


app.post('/signup', async (req, res) => {
    let input = req.body
    let hashedpassword = await generateHashedPassword(input.password)
    console.log(hashedpassword)
    input.password = hashedpassword
    let blog = new blogmodel(input)
    blog.save()
    res.json({ "status": "success" })
})

app.post('/signin', (req, res) => {
    let input = req.body
    blogmodel.find({ "email": req.body.email }).then(
        (response) => {
            if (response.length > 0) {
                let dbpassword = response[0].password
                console.log(dbpassword)
                bcrypt.compare(input.password, dbpassword, (error, ismatch)=> {
                    if (ismatch) {
                        res.json({ "status": "success", "userId": response[0]._id })

                    } else {
                        res.json({ "status": "incorrect" })
                    }
            })
        }else {
                res.json({ "status": "user not found" })
            }
        }
    ).catch()
})

app.listen(8080, () => {
    console.log("server started")
})
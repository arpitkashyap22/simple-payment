const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.post("/signup", async (req,res) => {
    const body = req.body;
    const {success} = signupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }


    const user = await User.findOne({
        username: body.username
    })

    if(user){
        return res.json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const dbUser = await User.create(body);

    await Account.create({
        userId: dbUser._id,
        balance: 1 + Math.random() * 10000
    })

    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    console.log("Signup Sucessfull");

    res.json({
        message: "User created sucessfully",
        token: token
    })
})


const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", async (req, res) => {
    const {success} = signinSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user) {
        const token = jwt .sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })
})

const updateSchema = zod.object({
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

router.put("/update", authMiddleware, async (req, res) => {
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information"
        })
    } 
    await User.updateOne({ _id: req.userId }, req.body);
    res.json({
        message: "User upadated sucessfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;
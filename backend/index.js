const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const mainRouter = require("./routes/index");

app.use("/api/v1", mainRouter);


// /api/vi/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword

// /api/v1/account/transferMoney
// /api/v1/account/balance

app.listen(3000, ()=>{
    console.log("Server is running");
});
import { useState } from "react"
import { Heading } from "../components/Heading";
import { Subheading } from "../components/Subheading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () =>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    return <div>
        <Heading lable={"Sign in"} ></Heading>
        <Subheading lable={"Enter your information to login"}></Subheading>
        <InputBox label={"User Name:"} onChange={(e)=>{
            setUsername(e.target.value);
        }} placeholder={"example@gmail.com"}></InputBox>
        <InputBox label={"Password:"} onChange={(e)=>{
            setPassword(e.target.value);
        }} placeholder={"password"}></InputBox>
        <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
            })
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard");
        }} label={"Signin"}></Button>
        <BottomWarning label={"Don't have a account"} buttonText={"Singup"} to={"/signup"}></BottomWarning>
    </div>
}
import { useState } from "react"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { Subheading } from "../components/Subheading"
import { Button } from "../components/Button"
import { BottomWarning } from "../components/BottomWarning"
import { useNavigate } from "react-router-dom"
import axios from "axios";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    return <div>
        <Heading lable={"Sign Up"}></Heading>
        <Subheading lable={"Enter your information to create an account"}></Subheading>
        <InputBox label={"First name:"} placeholder={"Arpit"} onChange={(e)=>{
            setFirstName(e.target.value);
        }}></InputBox>
        <InputBox label={"Last Name:"} placeholder={"Kashyap"} onChange={(e)=>{
            setLastName(e.target.value);
        }}></InputBox><InputBox label={"Email:"} placeholder={"arpitkashyap2000@gmail.com"} onChange={(e)=>{
            setEmail(e.target.value);
        }}></InputBox><InputBox label={"Password:"} placeholder={"123456"} onChange={(e)=>{
            setPassword(e.target.value);
        }}></InputBox>
        <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username: email,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard");
          }} label={"Sign up"} />

        <BottomWarning label={"Already have a account?"} buttonText={"Sign in"} to={"/signin"}></BottomWarning>

    </div>
}
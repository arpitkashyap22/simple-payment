import axios from "axios";
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance";
import {Users} from "../components/Users";
import { useEffect } from "react";

export const Dashboard = () => {
    return <div>
        <Appbar></Appbar>
        <div className="m-8">
            <Balance></Balance>
            <Users></Users>
        </div>
    </div>
}

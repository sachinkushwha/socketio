import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Longin } from "../api/api";

export const Login = () => {

    const email = useRef();
    const password = useRef();

    const handlesubmit =async (e) => {
        e.preventDefault();
        const logindata={
            email:email.current.value,
            password: password.current.value
        }
       await Longin(logindata).then((msg)=>{
        console.log('done',msg);
       })
        console.log(email.current.value, password.current.value);
        email.current.value='';
        password.current.value='';

    }

    return <>
        <form onSubmit={handlesubmit}>
            <input type="text" ref={email}  placeholder="enter email" />
            <input type="password" ref={password}  placeholder="enter password" />
            <button type="submit">Login</button>
        </form>
        <p>if yout don't have account <Link to='/signup'>signup</Link></p>
    </>
}
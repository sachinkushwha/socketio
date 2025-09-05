import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Signupapi } from "../api/api";
export const Signup = () => {
    const navigate=useNavigate();
    const name = useRef();
    const email = useRef();
    const password = useRef();
    const handlesubmit = async (e) => {
        e.preventDefault();
        const signupdata = {
            name: name.current.value,
            email: email.current.value,
            password: password.current.value
        }
        await Signupapi(signupdata).then((result) => {
            alert(result);
            navigate('/login');
        })
        console.log(name.current.value, email.current.value, password.current.value);
        name.current.value = '';
        email.current.value = '';
        password.current.value = '';
    }
    return <>
        <form onSubmit={handlesubmit}>
            <input type="text" ref={name} placeholder="enter name" />
            <input type="email" ref={email} placeholder="enter email" />
            <input type="password" ref={password} placeholder="enter password" />
            <button type="submit">signup</button>
        </form>
        <p>already have accout <Link to='/login' >Login</Link></p>
    </>
}
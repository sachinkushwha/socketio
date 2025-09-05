import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"

export const Protected = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('chattoken');
    useEffect(()=>{
 if (!token) {
        navigate('/login');
    }
    },[navigate]);
   
    return <>
        <Outlet />
    </>
}
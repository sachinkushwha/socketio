import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Longin } from "../api/api";

export const Login = () => {

    const email = useRef();
    const password = useRef();

    const handlesubmit = async (e) => {
        e.preventDefault();
        const logindata = {
            email: email.current.value,
            password: password.current.value
        }
        const msg = await Longin(logindata);
        // console.log('done', msg);

        // console.log(email.current.value, password.current.value);
        email.current.value = '';
        password.current.value = '';

    }

    return <>
          <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-[#1e1e1e] p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-bold text-center text-violet-500 mb-6">
                    Login
                </h2>

                <form onSubmit={handlesubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        ref={email}
                        placeholder="Enter email"
                        className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 
                                   focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <input
                        type="password"
                        ref={password}
                        placeholder="Enter password"
                        className="px-4 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 
                                   focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />
                    <button
                        type="submit"
                        className=" cursor-pointer w-full py-2 rounded-lg bg-violet-600 text-white font-semibold 
                                   hover:bg-violet-700 transition"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-4">
                    If you don't have an account{" "}
                    <Link to='/signup' className="text-violet-400 hover:underline">
                        Signup
                    </Link>
                </p>
            </div>
        </div>
            </>
}
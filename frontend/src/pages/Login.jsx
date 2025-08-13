import { useState } from "react"

export const Longin=()=>{
    const [currState,setCurrState]=useState('Sign up')
    const [fullname,setFullname]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [bio,setBio]=useState('')
    const [isDataSubmited,setIsDataSubmited]=useState('')

    const onSubmitHandler=(e)=>{
        e.preventDefault();
        if(currState==='Sign up' && !isDataSubmited){
            setIsDataSubmited(true)
            return;
        }
    }


    return<>
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
        <img src="" alt="logo" className="w-[min(30vw,250px)]"/>
        <form onSubmit={onSubmitHandler} className="border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg">
<h2 className="font-medium text-2xl flex justify-between items-center">
{currState}
{isDataSubmited && <img onClick={()=>setIsDataSubmited(false)} src="" alt="arrow icon" className="w-5 cursor-pointer"/>}

</h2>
{currState==='Sign up' && !isDataSubmited &&(
<input onChange={(e)=>setFullname(e.target.value)} value={fullname} type="text" className="p-2 border border-gray-500 rounded-mid focus:outline-none" placeholder="full name" required />
)}
{!isDataSubmited &&(
    <>
    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="email" required className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />

    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="password" required className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
    </>
)}
{
    currState==='Sign up' && isDataSubmited && (
        <textarea onChange={(e)=>setBio(e.target.value)} value={bio} rows={4} className="'p-2 border border-gray-500 rounded-mid focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="provide a sort bio..." required></textarea>
    )
}
<button type="submit" className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer">{currState==='Sign up'?'create account':'Login now'}</button>
<div className="flex items-center gap-2 text-sm text-gray-500">
    <input type="checkbox"  />
    <p>agree to the terms of use & privacy policy.</p>
</div>
<div className="flex flex-col gap-2">
    {currState==='Sign up'?(
        <p className="text-sm text-gray-600">already have an account?<span onClick={()=>{setCurrState('Login'); setIsDataSubmited(false)}} className="font-medium text-violet-500 cursor-pointer">Login here</span></p>
    ):(<p className="text-sm text-gray-600">Create an account <span onClick={()=>{setCurrState('Sign up')}} className="font-medium text-violet-500 cursor-pointer">click here</span></p>)}
</div>
        </form>
    </div>
    </>
}
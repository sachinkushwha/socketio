export const Longin=async(logindata)=>{
    const response=await fetch('https://socketio-iota.vercel.app/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(logindata)
    });
    const data=await response.json();
    if(data.success){
        localStorage.setItem('chattoken',data.jwtToken);
        localStorage.setItem('chatemail',data.email);
        localStorage.setItem('chatuserid',data.userId);
        window.location.href='/';
    }
    return data;
}

export const Signupapi=async(signupdata)=>{
const response=await fetch('https://socketio-iota.vercel.app/signup',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(signupdata)
});
const result=await response.json();
return result;
}

export const User=async()=>{
    const response = await fetch('https://socketio-iota.vercel.app/user');
    const result = await response.json();
    console.log(result);
    return result;
}
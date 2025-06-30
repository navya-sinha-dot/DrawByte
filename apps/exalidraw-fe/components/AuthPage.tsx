"use client";

export function AuthPage({isSignin}:{
    isSignin:boolean
})
{
    return <div className="w-screen  h-screen flex justify-center items-center">
        <div className="p-4 m-3 bg-white rounded ">
            <div className="p-3">
            <input type="text" placeholder="Email"></input>
            </div>
            <div className="p-3">
            <input type="password" placeholder="Password"></input>
            </div>

            <button  className="bg-black flex justify-center items-center " onClick={()=>{

            }} > {isSignin ? "Signin" : "SignUp"}</button>
        </div>
    </div>
}
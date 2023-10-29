"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import React,{useState,useEffect} from "react";
import { trpc } from "../api/trpc/trpc";
import { verifyPassword } from "$/components/password/hashing";

export default function Login() {

    const [email, setEmail] = useState<string>("")
    const [emailError, setEmailError] = useState<boolean>(false)
    const [remember, setRemember] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [formMessage, setFormMessage] = useState<string>("")
    const [formError, setFormError] = useState<boolean>(false)
    const [uid, setUid] = useState<string|null>("")
    const [isUser, setIsUser] = useState<boolean>(false)
    const router = useRouter()

    const userGet = trpc.getUser.useQuery({email:email,uid:uid??""})

    useEffect(() => {
      if(localStorage.getItem("user")){
        setIsUser(true)
          router.push('/')
      }
    },[isUser])

    const handleLogin = () => {
      if(userGet.data){
        const valid = verifyPassword(password,userGet.data?.hash)
        if(!valid){
          setFormMessage("Incorrect EMail or Password")
          setFormError(true)
        }
        else {
          if(remember){
            if(typeof window !== 'undefined'){
              localStorage.setItem("user",userGet.data.uid)
            }
          }
          router.push('/')
        }
      }
      else {
        setFormMessage("User Don't Exists")
        setFormError(true)
      }
    }
  return (
    <div className="w-[100vw] h-[100vh]  bg-[#1E223B] flex justify-center items-center selection:bg-white">
      <div className="w-[40vw] rounded-xl border-t-[3px] border-t-[#AF89D4] py-[4vh] bg-[#212842] text-center text-white flex-col justify-center items-center">
        <h2 className="text-[1.3em] font-[700]">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            setFormError(false)
          }}
          placeholder="Enter Your EMail"
          className="w-[30vw] px-4 outline-none mt-[3vh] bg-[#2e3b59] rounded-lg h-[4vh] focus:text-[#AF89D4]"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            setFormError(false)
          }}
          placeholder="Enter you Password"
          className="w-[30vw] px-4 outline-none mt-[3vh] bg-[#2e3b59] rounded-lg h-[4vh] focus:text-[#AF89D4]"
        />
        <div className="w-[30vw] ml-[5vw] mt-6 flex items-center">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="form-checkbox text-[#212842] accent-[#AF89D4] border-[#AF89D4]"
            name="rem"
            id="rem"
          />
          <label htmlFor="rem" className="pl-2 pr-[3vw]">
            Remember Me
          </label>
        </div>
        <button onClick={handleLogin} className="bg-[#AF89D4] w-[20vw] my-[3vh] h-[4vh] rounded-full">
          Login
        </button>
        {formError && <h2 className="text-red-500 mb-2">{formMessage}</h2>}
        <h3>
          Already have an Account{" "}
          <Link href="/signup" className="text-[#af89d4]">
            Sign Up
          </Link>
        </h3>
      </div>
    </div>
  );
}

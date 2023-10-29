"use client"

import Link from "next/link";
import React,{useState,useEffect} from "react";
import { trpc } from "../api/trpc/trpc";
import { useRouter } from "next/navigation";
import { hashPassword } from "$/components/password/hashing";

export default function Signup() {

    const [firstName, setFirstName] = useState<string>("")
    const [nameError, setNameError] = useState<boolean>(false)
    const [lastName, setLastName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [emailError, setEmailError] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const [passwordError, setPasswordError] = useState<boolean>(false)
    const [passwordMessage, setpasswordMessage] = useState<string>("")
    const [formError, setFormError] = useState<boolean>(false)
    const router = useRouter()
    const userCreate = trpc.createUser.useMutation()
    const userGet = trpc.getUser.useQuery({email:email,uid:""})

    const handleSubmit = () => {
      if(!firstName || !lastName) {
        setNameError(true)
        return
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@pccoepune\.org$/;
      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

      if(!emailPattern.test(email)){
        setEmailError(true)
        return
      }
      if(password.includes(firstName) || password.includes(lastName)){
        setpasswordMessage("First Name or Last Name Not Allowed in password")
        setPasswordError(true)
        return
      }
      if(!passwordPattern.test(password)){
        setpasswordMessage("Password must have Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character")
        setPasswordError(true)
        return
      }
      if(userGet.data?.email){
        setFormError(true)
        return
      }
      const hashed = hashPassword(password)
        userCreate.mutate({
            email:email,
            first:firstName,
            last:lastName,
            password:hashed
        })
        router.push('/')
    }
    
  return (
    <div className="w-[100vw] h-[100vh]  bg-[#1E223B] flex justify-center items-center selection:bg-white">
      <div className="lg:w-[40vw] md:w-[55vw] w-[60vw] rounded-xl border-t-[3px] border-t-[#1DC3E9] py-[4vh] bg-[#212842] flex items-center text-center text-white flex-col">
        <h2 className="text-[1.3em] font-[700]">Signup</h2>
        <div className="flex lg:max-w-[35vw] md:w-[45vw] md:gap-4 md:flex-row flex-col">
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setNameError(false)
              setFirstName(e.target.value)}
            }
            placeholder="First Name"
            className="flex-1 pl-4 outline-none mt-[3vh] bg-[#2e3b59] rounded-lg min-h-[4vh] focus:text-[#1FACCE]"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setNameError(false)
              setLastName(e.target.value)
            }}
            placeholder="Last Name"
            className="flex-1 pl-4 outline-none mt-[3vh] bg-[#2e3b59] rounded-lg min-h-[4vh] focus:text-[#1FACCE]"
          />
        </div>
          {nameError && <h2 className="text-red-500 mt-2">Enter Valid Name</h2>}
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmailError(false)
            setEmail(e.target.value)
          }}
          placeholder="Enter Your EMail"
          className="w-[27vw] px-4 outline-none mt-[3vh] bg-[#2e3b59] rounded-lg h-[4vh] focus:text-[#1FACCE]"
          />
          {emailError && <h2 className="text-red-500 mt-2">Enter Valid Email</h2>}
        {/* <input type="text"  placeholder="Enter you Password" className='w-[27vw] px-4 outline-none mt-[3vh] bg-[#252F48] h-[4vh] focus:text-[#1FACCE]' /> */}
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPasswordError(false)
            setPassword(e.target.value)
          }}
          placeholder="Enter you Password"
          className="w-[27vw] px-4 outline-none mt-[3vh] bg-[#2e3b59] rounded-lg h-[4vh] focus:text-[#1FACCE]"
          />
          {passwordError && <h2 className="text-red-500 mt-2">{passwordMessage}</h2>}
        {/* <input type="password"  placeholder="Confirm you Password" className='w-[27vw] px-4 outline-none mt-[3vh] bg-[#252F48] h-[4vh] focus:text-[#1FACCE]' /> */}
        <button onClick={handleSubmit} className="bg-[#1DC3E9] w-[20vw] my-[3vh] h-[4vh] rounded-full">
          Signup
        </button>
        {formError && <h2 className="text-red-500 mt-2">User Already Exists</h2>}
        <h3>
          Already have an Account{" "}
          <Link href="/login" className="text-[#1dc3e9]">
            Login
          </Link>
        </h3>
      </div>
    </div>
  );
}

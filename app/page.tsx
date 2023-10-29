"use client"

import Image from 'next/image'
import { trpc } from './api/trpc/trpc'
import {useEffect, Suspense,useState} from 'react'
import PDFViewerComponent from '$/components/pdf/PDFViewer'
import Loading from '$/components/skeleton/Loading'
import { useRouter } from 'next/navigation'
import Navbar from '$/components/Navbar/Navbar'

export default function Home() {

  const router = useRouter();
  const [isUser, setIsUser] = useState<boolean>(false)
  
  useEffect(() => {
    if(!localStorage.getItem("user")){
      setIsUser(false)
      router.push('/login')
    }
  },[isUser])
  return (
    <>
    <Navbar/>
    <main className="">
      <Suspense fallback={<Loading/>}>
        <PDFViewerComponent/>
      </Suspense>
    </main>
    </>
  )
}

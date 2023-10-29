"use client"

import Image from 'next/image'
import { trpc } from './api/trpc/trpc'
import {useEffect, Suspense} from 'react'
import PDFViewerComponent from '$/components/pdf/PDFViewer'
import Loading from '$/components/skeleton/Loading'
import { useRouter } from 'next/navigation'
import Navbar from '$/components/Navbar/Navbar'

export default function Home() {

  const router = useRouter();
  
  useEffect(() => {
    if(!localStorage.getItem("user")){
      router.push('/login')
    }
  },[localStorage.getItem("user")])
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
